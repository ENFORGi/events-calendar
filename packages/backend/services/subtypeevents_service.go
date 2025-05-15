package services

import (
	"backend/models/generate_models"
	"backend/repositories"
	"fmt"
)

type SubTypeEventService struct {
	typeEventService *repositories.SubTypeEventsRepositoriy
}

func NewSubTypeEventService(ivcRepo *repositories.SubTypeEventsRepositoriy) *SubTypeEventService {
	return &SubTypeEventService{typeEventService: ivcRepo}
}

func (s *SubTypeEventService) CreateTypeEvents(typeEvent *generate_models.Subtypeevent) error {
	return s.typeEventService.CreateSubTypeEvents(typeEvent)
}

func (s *SubTypeEventService) DeleteTypeEvents(id uint) error {
	return s.typeEventService.DeleteSubTypeEvents(id)
}

func (s *SubTypeEventService) UpdateTypeEvents(typeEvent *generate_models.Subtypeevent) error {
	return s.typeEventService.UpdateSubTypeEvents(typeEvent)
}

func (s *SubTypeEventService) FindByIdTypeEvents(id uint) (*generate_models.Subtypeevent, error) {
	return s.typeEventService.FindByIdSubTypeEvents(id)
}

func (s *SubTypeEventService) FindAllSubTypeEventsByIdEvents(id uint) ([]*generate_models.Subtypeevent, error) {
	subEvents, err := s.typeEventService.FindAllSubTypeEventsByIdEvents(id)
	if err != nil {
		return nil, fmt.Errorf("failed to find subtype events: %v", err)
	}
	if len(subEvents) == 0 {
		return nil, nil
	}
	return subEvents, nil
}
