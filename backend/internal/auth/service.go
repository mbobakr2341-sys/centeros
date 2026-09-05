package auth

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strings"
	"time"

	"centeros/backend/internal/users"
)

type Service struct {
	users         *users.Repository
	refreshTokens *RefreshTokenRepository
}

func NewService(
	usersRepo *users.Repository,
	refreshTokenRepo *RefreshTokenRepository,
) *Service {
	return &Service{
		users:         usersRepo,
		refreshTokens: refreshTokenRepo,
	}
}

type AuthResult struct {
	User         *users.User
	AccessToken  string
	RefreshToken string
}

func (s *Service) Authenticate(
	ctx context.Context,
	centerCode string,
	email string,
	password string,
	tokenManager *TokenManager,
) (*AuthResult, error) {
	centerCode = strings.TrimSpace(centerCode)
	email = strings.TrimSpace(strings.ToLower(email))

	if email == "" || password == "" {
		return nil, fmt.Errorf("authentication failed")
	}

	var user *users.User
	var err error

	if centerCode != "" {
		user, err = s.users.FindByCenterCodeAndEmail(
			ctx,
			centerCode,
			email,
		)
	} else {
		user, err = s.users.FindSuperAdminByEmail(
			ctx,
			email,
		)
	}

	if err != nil {
		return nil, fmt.Errorf("authentication failed")
	}

	if !CheckPassword(password, user.PasswordHash) {
		return nil, fmt.Errorf("authentication failed")
	}

	if user.Role == "super_admin" {
		if user.CenterID != nil {
			return nil, fmt.Errorf("authentication failed")
		}
	} else {
		if user.CenterID == nil {
			return nil, fmt.Errorf("authentication failed")
		}
	}

	accessToken, err := tokenManager.GenerateAccessToken(
		user.ID,
		user.CenterID,
		user.Role,
	)
	if err != nil {
		return nil, fmt.Errorf("generate access token: %w", err)
	}

	refreshToken, refreshTokenHash, err := GenerateRefreshToken()
	if err != nil {
		return nil, fmt.Errorf("generate refresh token: %w", err)
	}

	expiresAt := time.Now().Add(RefreshTokenDuration)

	if err := s.refreshTokens.Create(
		ctx,
		user.ID,
		refreshTokenHash,
		expiresAt,
	); err != nil {
		return nil, fmt.Errorf("store refresh token: %w", err)
	}

	return &AuthResult{
		User:         user,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (s *Service) Refresh(
	ctx context.Context,
	refreshToken string,
	tokenManager *TokenManager,
) (*AuthResult, error) {
	refreshToken = strings.TrimSpace(refreshToken)

	if refreshToken == "" {
		return nil, fmt.Errorf("refresh token is required")
	}

	hash := sha256.Sum256([]byte(refreshToken))
	tokenHash := hex.EncodeToString(hash[:])

	userID, err := s.refreshTokens.FindValid(ctx, tokenHash)
	if err != nil {
		return nil, fmt.Errorf("invalid refresh token")
	}

	user, err := s.users.FindByID(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("user not found")
	}

	if user.Role == "super_admin" {
		if user.CenterID != nil {
			return nil, fmt.Errorf("invalid user")
		}
	} else {
		if user.CenterID == nil {
			return nil, fmt.Errorf("invalid user")
		}
	}

	accessToken, err := tokenManager.GenerateAccessToken(
		user.ID,
		user.CenterID,
		user.Role,
	)
	if err != nil {
		return nil, fmt.Errorf("generate access token: %w", err)
	}

	newRefreshToken, newRefreshTokenHash, err := GenerateRefreshToken()
	if err != nil {
		return nil, fmt.Errorf("generate refresh token: %w", err)
	}

	if err := s.refreshTokens.Revoke(ctx, tokenHash); err != nil {
		return nil, fmt.Errorf("revoke refresh token: %w", err)
	}

	expiresAt := time.Now().Add(RefreshTokenDuration)

	if err := s.refreshTokens.Create(
		ctx,
		user.ID,
		newRefreshTokenHash,
		expiresAt,
	); err != nil {
		return nil, fmt.Errorf("store refresh token: %w", err)
	}

	return &AuthResult{
		User:         user,
		AccessToken:  accessToken,
		RefreshToken: newRefreshToken,
	}, nil
}
