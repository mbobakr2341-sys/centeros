package users

import (
	"encoding/json"
	"net/http"
)

type CreateCenterAdminRequest struct {
	CenterID uint64 `json:"center_id"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

type CreateCenterAdminResponse struct {
	ID       uint64 `json:"id"`
	CenterID uint64 `json:"center_id"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Role     string `json:"role"`
}

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) CreateCenterAdmin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateCenterAdminRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	user, err := h.service.CreateCenterAdmin(
		r.Context(),
		req.CenterID,
		req.Email,
		req.Name,
		req.Password,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := CreateCenterAdminResponse{
		ID:       user.ID,
		CenterID: *user.CenterID,
		Email:    user.Email,
		Name:     user.Name,
		Role:     user.Role,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		return
	}
}
