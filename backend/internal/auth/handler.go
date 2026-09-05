package auth

import (
	"encoding/json"
	"net/http"
)

type LoginRequest struct {
	CenterCode string `json:"center_code"`
	Email      string `json:"email"`
	Password   string `json:"password"`
}

type LoginResponse struct {
	AccessToken  string       `json:"access_token"`
	RefreshToken string       `json:"refresh_token"`
	TokenType    string       `json:"token_type"`
	ExpiresIn    int64        `json:"expires_in"`
	User         UserResponse `json:"user"`
}

type UserResponse struct {
	ID       uint64  `json:"id"`
	Email    string  `json:"email"`
	Name     string  `json:"name"`
	Role     string  `json:"role"`
	CenterID *uint64 `json:"center_id,omitempty"`
}

type Handler struct {
	service      *Service
	tokenManager *TokenManager
}

func NewHandler(service *Service, tokenManager *TokenManager) *Handler {
	return &Handler{
		service:      service,
		tokenManager: tokenManager,
	}
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req LoginRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	result, err := h.service.Authenticate(
		r.Context(),
		req.CenterCode,
		req.Email,
		req.Password,
		h.tokenManager,
	)
	if err != nil {
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	response := LoginResponse{
		AccessToken:  result.AccessToken,
		RefreshToken: result.RefreshToken,
		TokenType:    "Bearer",
		ExpiresIn:    int64(AccessTokenDuration.Seconds()),
		User: UserResponse{
			ID:       result.User.ID,
			Email:    result.User.Email,
			Name:     result.User.Name,
			Role:     result.User.Role,
			CenterID: result.User.CenterID,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		return
	}
}
