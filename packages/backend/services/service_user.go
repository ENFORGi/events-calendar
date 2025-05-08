package services

import (
	"backend/models/generate_models"
	"backend/repositories"
	"fmt"
)

type UserService struct {
	userRepository *repositories.UserRepository
}

func NewUserService(userRepo *repositories.UserRepository) *UserService {
	return &UserService{userRepository: userRepo}
}

func (s *UserService) CreateUser(user *generate_models.User) error {
	existingUser, err := s.userRepository.FindByMailUser(user.Mail)
	if err != nil {
		return fmt.Errorf("error in the search: %v", err)
	}
	if existingUser != nil {
		return fmt.Errorf("user with email %v already exists", user.Mail)
	}

	return s.userRepository.CreateUser(user)
}

func (s *UserService) FindById(id uint) (*generate_models.User, error) {
	return s.userRepository.FindByIdUser(id)
}

func (s *UserService) DeleteUser(id uint) error {
	return s.userRepository.DeleteUser(id)
}

func (s *UserService) FindAllUser() ([]*generate_models.User, error) {
	return s.userRepository.FindAllUser()
}

func (s *UserService) UpdateUser(user *generate_models.User) error {
	existingUser, err := s.userRepository.FindByIdUser(uint(user.ID))
	if err != nil {
		return fmt.Errorf("error finding user: %v", err)
	}
	if existingUser == nil {
		return fmt.Errorf("user with id %v not found", user.ID)
	}

	if user.Mail != existingUser.Mail {
		userWithSameMail, err := s.userRepository.FindByMailUser(user.Mail)
		if err != nil {
			return fmt.Errorf("error checking email uniqueness: %v", err)
		}
		if userWithSameMail != nil && userWithSameMail.ID != user.ID {
			return fmt.Errorf("email %v is already used by another user", user.Mail)
		}
	}

	existingUser.Mail = user.Mail
	existingUser.Name = user.Name
	existingUser.Idivc = user.Idivc

	return s.userRepository.UpdateUser(existingUser)
}

func (s *UserService) SetAdminStatus(userID uint, isAdmin bool) error {
	user, err := s.userRepository.FindByIdUser(userID)
	if err != nil {
		return fmt.Errorf("error finding user: %v", err)
	}
	if user == nil {
		return fmt.Errorf("user with id %v not found", userID)
	}
	user.Isadmin = isAdmin
	return s.userRepository.UpdateUser(user)
}

func (s *UserService) CheckAdmin(userID uint) (bool, error) {
	user, err := s.userRepository.FindByIdUser(userID)
	if err != nil {
		return false, fmt.Errorf("error finding user: %v", err)
	}
	if user == nil {
		return false, fmt.Errorf("user with id %v not found", userID)
	}
	return user.Isadmin, nil
}
