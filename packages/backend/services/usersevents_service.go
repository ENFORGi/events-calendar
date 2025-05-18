package services

import (
	"backend/models/generate_models"
	"backend/repositories"

	"fmt"
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
	err := s.userEventsRepositoriy.UpdateUserEvent(userEvent)
	if err != nil {
		return fmt.Errorf("Error: %v", err)
	}
	return nil
}

func (s *UserEventsService) GetEvents(userID uint) ([]*generate_models.Event, error) {
	return s.userEventsRepositoriy.GetEvents(userID)
}

func (s *UserEventsService) GetUserEvents(userID uint) ([]generate_models.Usersevent, error) {
	userevents, err := s.userEventsRepositoriy.GetUserEvents(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to find user event: %v", err)
	}
	if len(userevents) == 0 {
		return nil, nil
	}
	return userevents, nil
}

func (s *UserEventsService) GetUserEventById(id uint) (*generate_models.Usersevent, error) {
	event, err := s.userEventsRepositoriy.GetUserEventById(id)
	if err != nil {
		return nil, fmt.Errorf("Error: %v", err)
	}
	if event == nil {
		return nil, nil
	}
	return event, nil
}
