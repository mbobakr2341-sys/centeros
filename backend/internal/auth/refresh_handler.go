package auth

import (
	"encoding/json"
	"net/http"
)

type RefreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type RefreshResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int64  `json:"expires_in"`
}

type RefreshHandler struct {
	service      *Service
	tokenManager *TokenManager
}

func NewRefreshHandler(
	service *Service,
	tokenManager *TokenManager,
) *RefreshHandler {
	return &RefreshHandler{
		service:      service,
		tokenManager: tokenManager,
	}
}

func (h *RefreshHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RefreshRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.RefreshToken == "" {
		http.Error(w, "refresh token is required", http.StatusBadRequest)
		return
	}

	result, err := h.service.Refresh(
		r.Context(),
		req.RefreshToken,
		h.tokenManager,
	)
	if err != nil {
		http.Error(w, "invalid or expired refresh token", http.StatusUnauthorized)
		return
	}

	response := RefreshResponse{
		AccessToken:  result.AccessToken,
		RefreshToken: result.RefreshToken,
		TokenType:    "Bearer",
		ExpiresIn:    int64(AccessTokenDuration.Seconds()),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		return
	}
}
