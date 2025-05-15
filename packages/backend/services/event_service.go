package services

import (
	"backend/models/generate_models"
	"backend/repositories"
	"fmt"
)

type EventService struct {
	eventRepository *repositories.EventsRepositoriy
}

func NewEventService(eventRepo *repositories.EventsRepositoriy) *EventService {
	return &EventService{eventRepository: eventRepo}
}

func (s *EventService) CreateEvent(event *generate_models.Event) error {
	return s.eventRepository.CreateEvent(event)
}

func (s *EventService) DeleteEvent(id uint) error {
	return s.eventRepository.DeleteEvent(id)
}

func (s *EventService) UpdateEvent(event *generate_models.Event) error {
	return s.eventRepository.UpdateEvent(event)
}

func (s *EventService) FindByIdEvent(id uint) (*generate_models.Event, error) {
	event, err := s.eventRepository.FindByIdEvent(id)
	if err != nil {
		return nil, fmt.Errorf("Database error: %v", err)
	}
	if event == nil {
		return nil, nil
	}
	return event, nil
}

func (s *EventService) GetUserEventsByDate(userID uint, dateStart string, dateEnd string) ([]*generate_models.Event, error) {
	events, err := s.eventRepository.GetUserEventsByDate(userID, dateStart, dateEnd)
	if err != nil {
		return nil, fmt.Errorf("Database error: %v", err)
	}
	if len(events) == 0 {
		return nil, nil
	}

	return events, nil
}

func (s *EventService) EventsByAccessType(typeEvent bool) ([]*generate_models.Event, error) {
	return s.eventRepository.EventsByAccessType(typeEvent)
}

func (s *EventService) EventsByType(typeEvent string) ([]*generate_models.Event, error) {
	return s.eventRepository.EventsByType(typeEvent)
}

func (s *EventService) EventsByIvc(idIvc int) ([]*generate_models.Event, error) {
	return s.eventRepository.EventsByIvc(idIvc)
}

func (s *EventService) EventsByName(name string) (*generate_models.Event, error) {
	return s.eventRepository.EventsByName(name)
}

func (s *EventService) EventsSimilarNames(name string) ([]*generate_models.Event, error) {
	return s.eventRepository.EventsSimilarNames(name)
}
