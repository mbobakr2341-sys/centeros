package centers

import (
	"context"
	"fmt"
	"strings"
)

type Service struct {
	repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		repository: repository,
	}
}

func (s *Service) Create(
	ctx context.Context,
	name string,
	code string,
) (*Center, error) {
	name = strings.TrimSpace(name)
	code = strings.TrimSpace(strings.ToLower(code))

	if name == "" {
		return nil, fmt.Errorf("center name is required")
	}

	if code == "" {
		return nil, fmt.Errorf("center code is required")
	}

	if len(name) > 150 {
		return nil, fmt.Errorf("center name is too long")
	}

	if len(code) > 50 {
		return nil, fmt.Errorf("center code is too long")
	}

	center := &Center{
		Name: name,
		Code: code,
	}

	id, err := s.repository.Create(ctx, center)
	if err != nil {
		return nil, err
	}

	center.ID = id

	return center, nil
}

func (s *Service) GetByID(
	ctx context.Context,
	id uint64,
) (*Center, error) {
	if id == 0 {
		return nil, fmt.Errorf("invalid center id")
	}

	return s.repository.FindByID(ctx, id)
}
