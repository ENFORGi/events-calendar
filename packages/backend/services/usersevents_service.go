package services

import (
	"backend/models/generate_models"
	"backend/repositories"
)

type UserEventsService struct {
	userEventsRepositoriy *repositories.UserEventsRepositoriy
}

func NewUserEventsService(userEventsRepo *repositories.UserEventsRepositoriy) *UserEventsService {
	return &UserEventsService{userEventsRepositoriy: userEventsRepo}
}

func (s *UserEventsService) CreateUserEvent(userEvent *generate_models.Usersevent) error {
	return s.userEventsRepositoriy.CreateUserEvent(userEvent)
}

func (s *UserEventsService) DeleteUserEvent(id uint) error {
	return s.userEventsRepositoriy.DeleteUserEvent(id)
}

func (s *UserEventsService) UpdateUserEvent(userEvent *generate_models.Usersevent) error {
	return s.userEventsRepositoriy.UpdateUserEvent(userEvent)
}

func (s *UserEventsService) FindByIdUserEvent(id uint) (*generate_models.Usersevent, error) {
	return s.userEventsRepositoriy.FindByIdUserEvent(id)
}

func (s *UserEventsService) GetUserEvents(userID uint) ([]*generate_models.Event, error) {
	return s.userEventsRepositoriy.GetUserEvents(userID)
}
