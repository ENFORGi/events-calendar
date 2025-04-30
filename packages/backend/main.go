package main

import (
	"database/sql"
	// "events-calendar/packages/backend/db"
	// "events-calendar/packages/backend/db/postgres"
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"log"
	"net/http"
	"os"
)

func runMigrations() error {
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	m, err := migrate.New(
		"file://migrations",
		connStr,
	)

	if err != nil {
		return fmt.Errorf("failed to create migration instance: %w", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("failed to apply migrations: %w", err)
	}

	return nil
}

func seedDatabase() error {
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

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

	return nil
}

func main() {
	// Миграция данных
	if err := runMigrations(); err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	if err := seedDatabase(); err != nil {
		log.Fatalf("Seeding failed: %v", err)
	}

	log.Printf("DB config: host=%s, port=%s, name=%s, user=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_USER"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Сервер работает! База данных: %s", os.Getenv("DB_NAME"))
	})

	log.Println("Starting server on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}
