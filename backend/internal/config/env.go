package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvFile() error {
	if err := godotenv.Load("../.env"); err != nil {
		if os.IsNotExist(err) {
			return nil
		}

		return fmt.Errorf("load .env: %w", err)
	}

	return nil
}
