package services

import (
	"backend/models/generate_models"
	"backend/repositories"
)

type TypeEventService struct {
	typeEventService *repositories.TypeEventsRepositoriy
}

func NewTypeEventService(ivcRepo *repositories.TypeEventsRepositoriy) *TypeEventService {
	return &TypeEventService{typeEventService: ivcRepo}
}

func (s *TypeEventService) CreateTypeEvents(typeEvent *generate_models.Typeevent) error {
	return s.typeEventService.CreateTypeEvents(typeEvent)
}

func (s *TypeEventService) DeleteTypeEvents(id uint) error {
	return s.typeEventService.DeleteTypeEvents(id)
}

func (s *TypeEventService) UpdateTypeEvents(typeEvent *generate_models.Typeevent) error {
	return s.typeEventService.UpdateTypeEvents(typeEvent)
}

func (s *TypeEventService) FindByIdTypeEvents(id uint) (*generate_models.Typeevent, error) {
	return s.typeEventService.FindByIdTypeEvents(id)
}

func (s *TypeEventService) FindAllTypeEvents() ([]*generate_models.Typeevent, error) {
	events, err := s.typeEventService.FindAllTypeEvents()
	if err != nil {
		return nil, err
	}
	if events == nil {
		return nil, nil
	}

	return events, err
}
