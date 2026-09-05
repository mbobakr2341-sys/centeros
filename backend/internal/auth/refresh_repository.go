package auth

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type RefreshTokenRepository struct {
	db *sql.DB
}

func NewRefreshTokenRepository(db *sql.DB) *RefreshTokenRepository {
	return &RefreshTokenRepository{
		db: db,
	}
}

func (r *RefreshTokenRepository) Create(
	ctx context.Context,
	userID uint64,
	tokenHash string,
	expiresAt time.Time,
) error {
	const query = `
		INSERT INTO refresh_tokens (
			user_id,
			token_hash,
			expires_at
		)
		VALUES (?, ?, ?)
	`

	_, err := r.db.ExecContext(
		ctx,
		query,
		userID,
		tokenHash,
		expiresAt,
	)

	if err != nil {
		return fmt.Errorf("create refresh token: %w", err)
	}

	return nil
}

func (r *RefreshTokenRepository) FindValid(
	ctx context.Context,
	tokenHash string,
) (uint64, error) {
	const query = `
		SELECT
			user_id
		FROM refresh_tokens
		WHERE token_hash = ?
		  AND revoked_at IS NULL
		  AND expires_at > CURRENT_TIMESTAMP
		LIMIT 1
	`

	var userID uint64

	err := r.db.QueryRowContext(
		ctx,
		query,
		tokenHash,
	).Scan(&userID)

	if err != nil {
		if err == sql.ErrNoRows {
			return 0, fmt.Errorf("refresh token not found")
		}

		return 0, fmt.Errorf("find refresh token: %w", err)
	}

	return userID, nil
}

func (r *RefreshTokenRepository) Revoke(
	ctx context.Context,
	tokenHash string,
) error {
	const query = `
		UPDATE refresh_tokens
		SET revoked_at = CURRENT_TIMESTAMP
		WHERE token_hash = ?
		  AND revoked_at IS NULL
	`

	_, err := r.db.ExecContext(
		ctx,
		query,
		tokenHash,
	)

	if err != nil {
		return fmt.Errorf("revoke refresh token: %w", err)
	}

	return nil
}
