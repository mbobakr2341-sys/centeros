package auth

import (
	"context"
)

type contextKey string

const (
	userIDKey   contextKey = "user_id"
	centerIDKey contextKey = "center_id"
	roleKey     contextKey = "role"
)

func WithUserID(ctx context.Context, userID uint64) context.Context {
	return context.WithValue(ctx, userIDKey, userID)
}

func UserIDFromContext(ctx context.Context) (uint64, bool) {
	value, ok := ctx.Value(userIDKey).(uint64)
	return value, ok
}

func WithCenterID(ctx context.Context, centerID uint64) context.Context {
	return context.WithValue(ctx, centerIDKey, centerID)
}

func CenterIDFromContext(ctx context.Context) (uint64, bool) {
	value, ok := ctx.Value(centerIDKey).(uint64)
	return value, ok
}

func WithRole(ctx context.Context, role string) context.Context {
	return context.WithValue(ctx, roleKey, role)
}

func RoleFromContext(ctx context.Context) (string, bool) {
	value, ok := ctx.Value(roleKey).(string)
	return value, ok
}
