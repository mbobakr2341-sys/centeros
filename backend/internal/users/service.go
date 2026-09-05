package users

import (
	"context"
	"fmt"
	"strings"

	"centeros/backend/internal/centers"
	"centeros/backend/internal/security"
)

type Service struct {
	repository    *Repository
	centerService *centers.Service
}

func NewService(
	repository *Repository,
	centerService *centers.Service,
) *Service {
	return &Service{
		repository:    repository,
		centerService: centerService,
	}
}

func (s *Service) CreateCenterAdmin(
	ctx context.Context,
	centerID uint64,
	email string,
	name string,
	password string,
) (*User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	name = strings.TrimSpace(name)

	if centerID == 0 {
		return nil, fmt.Errorf("invalid center id")
	}

	if email == "" {
		return nil, fmt.Errorf("email is required")
	}

	if name == "" {
		return nil, fmt.Errorf("name is required")
	}

	if password == "" {
		return nil, fmt.Errorf("password is required")
	}

	if len(password) < 8 {
		return nil, fmt.Errorf("password must be at least 8 characters")
	}

	if len(email) > 255 {
		return nil, fmt.Errorf("email is too long")
	}

	if len(name) > 150 {
		return nil, fmt.Errorf("name is too long")
	}

	if _, err := s.centerService.GetByID(ctx, centerID); err != nil {
		return nil, fmt.Errorf("center not found")
	}

	passwordHash, err := security.HashPassword(password)
	if err != nil {
		return nil, fmt.Errorf("hash password: %w", err)
	}

	user := &User{
		CenterID:     &centerID,
		Email:        email,
		PasswordHash: passwordHash,
		Name:         name,
		Role:         "center_admin",
	}

	id, err := s.repository.Create(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = id

	return user, nil
}
