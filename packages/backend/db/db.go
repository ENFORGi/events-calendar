package db

import (
	"database/sql"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB
var sqlDB *sql.DB

// Init инициализируем подключение к ORM
func Init(conn string) error {
	dsn := conn

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	DB = db

	sqlConn, err := db.DB()
	if err != nil {
		return fmt.Errorf("failed to get sql.DB: %w", err)
	}
	sqlDB = sqlConn

	log.Println("Connected to database using GORM")
	return nil
}

// Ping проверяет соединение с базой данных
func Ping() error {
	if sqlDB == nil {
		return nil
	}
	return sqlDB.Ping()
}

// Close закрывает соединение с базой данных
func Close() error {
	if sqlDB == nil {
		return nil
	}
	return sqlDB.Close()
}
