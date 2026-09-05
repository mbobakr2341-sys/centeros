package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	"centeros/backend/internal/auth"
	"centeros/backend/internal/config"
	"centeros/backend/internal/database"
	"golang.org/x/term"
)

func main() {
	if err := config.LoadEnvFile(); err != nil {
		log.Fatalf("environment loading failed: %v", err)
	}

	cfg := config.Load()

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}
	defer db.Close()

	fmt.Println("CenterOS - Create Super Admin")
	fmt.Println("--------------------------------")

	email := readLine("Email: ")
	name := readLine("Name: ")

	if email == "" || name == "" {
		log.Fatal("email and name are required")
	}

	fmt.Print("Password: ")
	passwordBytes, err := term.ReadPassword(int(os.Stdin.Fd()))
	fmt.Println()

	if err != nil {
		log.Fatalf("failed to read password: %v", err)
	}

	password := string(passwordBytes)

	if len(password) < 8 {
		log.Fatal("password must be at least 8 characters")
	}

	fmt.Print("Confirm password: ")
	confirmBytes, err := term.ReadPassword(int(os.Stdin.Fd()))
	fmt.Println()

	if err != nil {
		log.Fatalf("failed to read password confirmation: %v", err)
	}

	if password != string(confirmBytes) {
		log.Fatal("passwords do not match")
	}

	passwordHash, err := auth.HashPassword(password)
	if err != nil {
		log.Fatalf("failed to hash password: %v", err)
	}

	const checkQuery = `
		SELECT COUNT(*)
		FROM users
		WHERE email = ?
		  AND role = 'super_admin'
	`

	var count int

	err = db.QueryRowContext(
		context.Background(),
		checkQuery,
		email,
	).Scan(&count)

	if err != nil {
		log.Fatalf("failed to check existing admin: %v", err)
	}

	if count > 0 {
		log.Fatal("a super admin with this email already exists")
	}

	const insertQuery = `
		INSERT INTO users (
			center_id,
			email,
			password_hash,
			name,
			role
		)
		VALUES (NULL, ?, ?, ?, 'super_admin')
	`

	_, err = db.ExecContext(
		context.Background(),
		insertQuery,
		email,
		passwordHash,
		name,
	)

	if err != nil {
		log.Fatalf("failed to create super admin: %v", err)
	}

	fmt.Println()
	fmt.Println("Super admin created successfully.")
	fmt.Printf("Email: %s\n", email)
}

func readLine(label string) string {
	fmt.Print(label)

	var value string

	if _, err := fmt.Scanln(&value); err != nil {
		log.Fatalf("failed to read input: %v", err)
	}

	return strings.TrimSpace(value)
}

// Keep database/sql referenced explicitly so the generated command
// remains compatible with the project's database layer.
var _ *sql.DB
