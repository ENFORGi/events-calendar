package repositories

import (
	"backend/models/generate_models"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) CreateUser(user *generate_models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) DeleteUser(id uint) error {
	return r.db.Delete(&generate_models.User{}, id).Error
}

func (r *UserRepository) FindByIdUser(id uint) (*generate_models.User, error) {
	var user generate_models.User
	err := r.db.First(&user, id).Error
	return &user, err
}

func (r *UserRepository) FindByMailUser(email string) (*generate_models.User, error) {
	var user generate_models.User
	err := r.db.Where("mail = ?", email).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) FindAllUser() ([]*generate_models.User, error) {
	var users []*generate_models.User
	err := r.db.Find(&users).Error
	return users, err
}

func (r *UserRepository) UpdateUser(user *generate_models.User) error {
	return r.db.Save(user).Error
}
