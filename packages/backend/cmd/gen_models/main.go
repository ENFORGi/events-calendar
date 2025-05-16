package main

import (
	"backend/db"
	"backend/models"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
)

// GetPostgresConnection возвращает строку подключения к PostgreSQL.
func GetPostgresConnection() (string, error) {
	requiredVars := []string{"DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME"}
	for _, v := range requiredVars {
		if os.Getenv(v) == "" {
			return "", fmt.Errorf("environment variable %s is not set", v)
		}
	}

	conn := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	return conn, nil
}

func main() {
	if err := godotenv.Load("../../.env"); err != nil {
		log.Println("No .env file found or failed to load it")
	}

	connStr, err := GetPostgresConnection()
	if connStr == "" || err != nil {
		log.Fatal("Error")
	}

	if err := db.Init(connStr); err != nil {
		log.Fatalf("Failed to init DB: %v", err)
	}

	if err := models.GenerateTable(db.DB); err != nil {
		log.Fatalf("Failed to generate models: %v", err)
	}

	log.Println("Models generated")
}
