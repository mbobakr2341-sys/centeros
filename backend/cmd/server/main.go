package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"centeros/backend/internal/auth"
	"centeros/backend/internal/centers"
	"centeros/backend/internal/config"
	"centeros/backend/internal/database"
	"centeros/backend/internal/email"
	"centeros/backend/internal/users"
)

func main() {
	if err := config.LoadEnvFile(); err != nil {
		log.Fatalf("environment loading failed: %v", err)
	}

	cfg := config.Load()

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}
	defer db.Close()

	centerRepo := centers.NewRepository(db)
	centerService := centers.NewService(centerRepo)
	centerHandler := centers.NewHandler(centerService)

	userRepo := users.NewRepository(db)
	userService := users.NewService(userRepo, centerService)
	userHandler := users.NewHandler(userService)

	tokenManager, err := auth.NewTokenManager(cfg.JWTSecret)
	if err != nil {
		log.Fatalf("JWT configuration failed: %v", err)
	}

	refreshTokenRepo := auth.NewRefreshTokenRepository(db)
	authService := auth.NewService(userRepo, refreshTokenRepo)
	authHandler := auth.NewHandler(authService, tokenManager)
	refreshHandler := auth.NewRefreshHandler(authService, tokenManager)

	emailService, err := email.NewService()
	if err != nil {
		log.Fatalf("email service configuration failed: %v", err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/api/v1/public/booking", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var request email.BookingRequest

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "invalid request body", http.StatusBadRequest)
			return
		}

		if request.ManagerName == "" ||
			request.CenterName == "" ||
			request.Email == "" {
			http.Error(w, "manager name, center name and email are required", http.StatusBadRequest)
			return
		}

		if err := emailService.SendBooking(request); err != nil {
			log.Printf("booking email failed: %v", err)
			http.Error(w, "failed to send booking request", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"message": "booking request received successfully",
		}); err != nil {
			log.Printf("failed to encode booking response: %v", err)
		}
	})

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, `{"status":"ok","service":"centeros-api","database":"connected"}`)
	})

	mux.HandleFunc("/api/v1/auth/login", authHandler.Login)
	mux.HandleFunc("/api/v1/auth/refresh", refreshHandler.Refresh)

	protectedMe := auth.AuthMiddleware(tokenManager)(
		auth.RequireRole("super_admin")(
			http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				userID, _ := auth.UserIDFromContext(r.Context())
				role, _ := auth.RoleFromContext(r.Context())

				response := map[string]interface{}{
					"user_id": userID,
					"role":    role,
				}

				if centerID, ok := auth.CenterIDFromContext(r.Context()); ok {
					response["center_id"] = centerID
				}

				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusOK)

				if err := json.NewEncoder(w).Encode(response); err != nil {
					log.Printf("failed to encode /me response: %v", err)
				}
			}),
		))

	mux.Handle("/api/v1/auth/me", protectedMe)

	createCenter := auth.AuthMiddleware(tokenManager)(
		auth.RequireRole("super_admin")(
			http.HandlerFunc(centerHandler.Create),
		),
	)

	mux.Handle("/api/v1/centers", createCenter)

	createCenterAdmin := auth.AuthMiddleware(tokenManager)(
		auth.RequireRole("super_admin")(
			http.HandlerFunc(userHandler.CreateCenterAdmin),
		),
	)

	mux.Handle("/api/v1/users/center-admin", createCenterAdmin)

	tenantTest := auth.AuthMiddleware(tokenManager)(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID, _ := auth.UserIDFromContext(r.Context())
			role, _ := auth.RoleFromContext(r.Context())

			response := map[string]interface{}{
				"user_id": userID,
				"role":    role,
			}

			if centerID, ok := auth.CenterIDFromContext(r.Context()); ok {
				response["center_id"] = centerID
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)

			if err := json.NewEncoder(w).Encode(response); err != nil {
				log.Printf("failed to encode tenant test response: %v", err)
			}
		}),
	)

	mux.Handle("/api/v1/test/tenant", tenantTest)

	addr := ":" + cfg.Port

	log.Printf(
		"CenterOS API running on http://localhost%s [%s]",
		addr,
		cfg.AppEnv,
	)

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}
