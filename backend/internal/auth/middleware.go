package auth

import (
	"net/http"
	"strings"
)

func AuthMiddleware(tokenManager *TokenManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")

			if authHeader == "" {
				http.Error(w, "authorization required", http.StatusUnauthorized)
				return
			}

			parts := strings.Fields(authHeader)

			if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
				http.Error(w, "invalid authorization header", http.StatusUnauthorized)
				return
			}

			claims, err := tokenManager.ParseAccessToken(parts[1])
			if err != nil {
				http.Error(w, "invalid or expired token", http.StatusUnauthorized)
				return
			}

			ctx := r.Context()

			ctx = WithUserID(ctx, claims.UserID)

			if claims.CenterID != nil {
				ctx = WithCenterID(ctx, *claims.CenterID)
			}

			ctx = WithRole(ctx, claims.Role)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
