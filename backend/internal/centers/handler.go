package centers

import (
	"encoding/json"
	"net/http"
)

type CreateRequest struct {
	Name string `json:"name"`
	Code string `json:"code"`
}

type CreateResponse struct {
	ID   uint64 `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req CreateRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	center, err := h.service.Create(
		r.Context(),
		req.Name,
		req.Code,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := CreateResponse{
		ID:   center.ID,
		Name: center.Name,
		Code: center.Code,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		return
	}
}
