package users

import (
	"context"
	"database/sql"
	"fmt"
)

type User struct {
	ID           uint64
	CenterID     *uint64
	Email        string
	PasswordHash string
	Name         string
	Role         string
}

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) FindByCenterCodeAndEmail(
	ctx context.Context,
	centerCode string,
	email string,
) (*User, error) {
	const query = `
		SELECT
			u.id,
			u.center_id,
			u.email,
			u.password_hash,
			u.name,
			u.role
		FROM users u
		INNER JOIN centers c ON c.id = u.center_id
		WHERE c.code = ?
		  AND u.email = ?
		LIMIT 1
	`

	var user User

	err := r.db.QueryRowContext(
		ctx,
		query,
		centerCode,
		email,
	).Scan(
		&user.ID,
		&user.CenterID,
		&user.Email,
		&user.PasswordHash,
		&user.Name,
		&user.Role,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}

		return nil, fmt.Errorf("find user by center and email: %w", err)
	}

	return &user, nil
}

func (r *Repository) Create(
	ctx context.Context,
	user *User,
) (uint64, error) {
	const query = `
		INSERT INTO users (
			center_id,
			email,
			password_hash,
			name,
			role
		)
		VALUES (?, ?, ?, ?, ?)
	`

	result, err := r.db.ExecContext(
		ctx,
		query,
		user.CenterID,
		user.Email,
		user.PasswordHash,
		user.Name,
		user.Role,
	)
	if err != nil {
		return 0, fmt.Errorf("create user: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("get created user id: %w", err)
	}

	return uint64(id), nil
}

func (r *Repository) FindSuperAdminByEmail(
	ctx context.Context,
	email string,
) (*User, error) {
	const query = `
		SELECT
			id,
			center_id,
			email,
			password_hash,
			name,
			role
		FROM users
		WHERE email = ?
		  AND role = 'super_admin'
		  AND center_id IS NULL
		LIMIT 1
	`

	var user User

	err := r.db.QueryRowContext(
		ctx,
		query,
		email,
	).Scan(
		&user.ID,
		&user.CenterID,
		&user.Email,
		&user.PasswordHash,
		&user.Name,
		&user.Role,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("super admin not found")
		}

		return nil, fmt.Errorf("find super admin by email: %w", err)
	}

	return &user, nil
}

func (r *Repository) FindByID(
	ctx context.Context,
	id uint64,
) (*User, error) {
	const query = `
		SELECT
			id,
			center_id,
			email,
			password_hash,
			name,
			role
		FROM users
		WHERE id = ?
		LIMIT 1
	`

	var user User

	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&user.ID,
		&user.CenterID,
		&user.Email,
		&user.PasswordHash,
		&user.Name,
		&user.Role,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}

		return nil, fmt.Errorf("find user by id: %w", err)
	}

	return &user, nil
}
