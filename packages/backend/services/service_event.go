package services

import (
	"backend/models/generate_models"
	"backend/repositories"
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
	return s.eventRepository.FindByIdEvent(id)
}

func (s *EventService) CurrentEvents() ([]*generate_models.Event, error) {
	return s.eventRepository.CurrentEvents()
}

func (s *EventService) PastEvents() ([]*generate_models.Event, error) {
	return s.eventRepository.PastEvents()
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
