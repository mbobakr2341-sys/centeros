package auth

import "centeros/backend/internal/security"

func HashPassword(password string) (string, error) {
	return security.HashPassword(password)
}

func CheckPassword(password, hash string) bool {
	return security.CheckPassword(password, hash)
}
