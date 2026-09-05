package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const (
	AccessTokenDuration  = 15 * time.Minute
	RefreshTokenDuration = 30 * 24 * time.Hour
)

type TokenManager struct {
	secret []byte
}

type Claims struct {
	UserID   uint64  `json:"user_id"`
	CenterID *uint64 `json:"center_id,omitempty"`
	Role     string  `json:"role"`
	jwt.RegisteredClaims
}

func NewTokenManager(secret string) (*TokenManager, error) {
	if len(secret) < 32 {
		return nil, fmt.Errorf("JWT secret must be at least 32 characters")
	}

	return &TokenManager{
		secret: []byte(secret),
	}, nil
}

func (tm *TokenManager) GenerateAccessToken(
	userID uint64,
	centerID *uint64,
	role string,
) (string, error) {
	now := time.Now()

	claims := Claims{
		UserID:   userID,
		CenterID: centerID,
		Role:     role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(AccessTokenDuration)),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(tm.secret)
}

func (tm *TokenManager) ParseAccessToken(
	tokenString string,
) (*Claims, error) {
	token, err := jwt.ParseWithClaims(
		tokenString,
		&Claims{},
		func(token *jwt.Token) (interface{}, error) {
			if token.Method != jwt.SigningMethodHS256 {
				return nil, fmt.Errorf("unexpected signing method")
			}

			return tm.secret, nil
		},
	)

	if err != nil {
		return nil, fmt.Errorf("parse access token: %w", err)
	}

	claims, ok := token.Claims.(*Claims)

	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid access token")
	}

	return claims, nil
}

func GenerateRefreshToken() (string, string, error) {
	bytes := make([]byte, 32)

	if _, err := rand.Read(bytes); err != nil {
		return "", "", fmt.Errorf("generate refresh token: %w", err)
	}

	token := hex.EncodeToString(bytes)

	hash := sha256.Sum256([]byte(token))
	tokenHash := hex.EncodeToString(hash[:])

	return token, tokenHash, nil
}
