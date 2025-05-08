package main

import (
	"backend/db"
	"backend/models"
	"backend/services"

	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
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

// RunMigrations проводим миграцию если таковые были
func RunMigrations() error {
	connStr, err := GetPostgresConnection()
	if err != nil {
		return fmt.Errorf("failed to get DB connection string: %w", err)
	}

	m, err := migrate.New("file://migrations", connStr)
	if err != nil {
		return fmt.Errorf("failed to create migration instance: %w", err)
	}

	err = m.Up()
	if err != nil {
		if err == migrate.ErrNoChange {
			log.Println("No new migrations")
		} else {
			return fmt.Errorf("failed to apply migrations: %w", err)
		}
	} else {
		log.Println("Migrations applied successfully")
	}

	modelsPath := "models/generate_models"
	files, err := os.ReadDir(modelsPath)
	if err != nil {
		return fmt.Errorf("failed to read models directory: %w", err)
	}

	hasGenFiles := false
	for _, f := range files {
		if !f.IsDir() && filepath.Ext(f.Name()) == ".go" && filepath.Base(f.Name()) != "doc.go" {
			hasGenFiles = true
			break
		}
	}

	if !hasGenFiles {
		log.Println("No generated model files found. Generating models...")

		if err := models.GenerateTable(db.DB); err != nil {
			return fmt.Errorf("failed to generate models: %w", err)
		}
		log.Println("Models generated successfully")
	} else {
		log.Println("Generated models already exist — skipping generation.")
	}

	return nil
}

// SeedDatabase добавляем данные в таблицы из фала
func SeedDatabase() error {
	connStr, err := GetPostgresConnection()
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	defer db.Close()

	seedFile, err := os.ReadFile("seeds/initial_data.sql")
	if err != nil {
		return fmt.Errorf("failed to read seed file: %w", err)
	}

	if _, err = db.Exec(string(seedFile)); err != nil {
		return fmt.Errorf("failed to execute seed script: %w", err)
	}

	log.Println("Database seeded successfully")
	return nil
}

// main точка входа
func main() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	connStr, err := GetPostgresConnection()
	if err != nil {
		log.Fatalf("Failed to get DB connection string: %v", err)
	} else {
		log.Printf("DB Config: user=%s, host=%s, port=%s, dbname=%s",
			os.Getenv("DB_USER"),
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_NAME"))
	}

	if err := db.Init(connStr); err != nil {
		log.Fatalf("Failed to init GORM DB: %v", err)
	}

	if err := RunMigrations(); err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	if err := SeedDatabase(); err != nil {
		log.Fatalf("Seeding failed: %v", err)
	}

	serviceManager := services.NewServiceManager(db.DB)
	events, err := serviceManager.Usersevent.FindByIdUserEvent(1)
	if err != nil {
		fmt.Printf("err: %v", err)
	} else {
		fmt.Println(events)
	}
}
