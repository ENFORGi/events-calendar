package postgres

import (
	"backend/db"
	"database/sql"
	"fmt"
)

func (r *PostgresRepository) CreateUser(user *db.User) error {
	query := `INSERT INTO users (mail, name, isAdmin) VALUES ($1, $2, $3) RETURNING id`
	err := r.db.QueryRow(query, user.Mail, user.Name, user.IsAdmin).Scan(&user.ID)
	if err != nil {
		return fmt.Errorf("failed to create user: %v", err)
	}
	return nil
}

func (r *PostgresRepository) GetUserByID(id int) (*db.User, error) {
	query := `SELECT id, mail, name, isAdmin FROM users WHERE id = $1`
	row := r.db.QueryRow(query, id)

	var user db.User
	err := row.Scan(&user.ID, &user.Mail, &user.Name, &user.IsAdmin)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get user: %v", err)
	}

	return &user, nil
}
