package centers

import (
	"context"
	"database/sql"
	"fmt"
)

type Center struct {
	ID   uint64
	Name string
	Code string
}

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(
	ctx context.Context,
	center *Center,
) (uint64, error) {
	const query = `
		INSERT INTO centers (
			name,
			code
		)
		VALUES (?, ?)
	`

	result, err := r.db.ExecContext(
		ctx,
		query,
		center.Name,
		center.Code,
	)
	if err != nil {
		return 0, fmt.Errorf("create center: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("get created center id: %w", err)
	}

	return uint64(id), nil
}

func (r *Repository) FindByID(
	ctx context.Context,
	id uint64,
) (*Center, error) {
	const query = `
		SELECT
			id,
			name,
			code
		FROM centers
		WHERE id = ?
		LIMIT 1
	`

	var center Center

	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&center.ID,
		&center.Name,
		&center.Code,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("center not found")
		}
		return nil, fmt.Errorf("find center by id: %w", err)
	}

	return &center, nil
}
