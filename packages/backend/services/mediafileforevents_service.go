package services

import (
	"backend/models/generate_models"
	"backend/repositories"
	"fmt"
)

type MediaFileEventsService struct {
	mediaFileEventsRepositoriy *repositories.MediaFileEventsRepositoriy
}

func NewMediaFileEventsService(mediaFileEventsRepo *repositories.MediaFileEventsRepositoriy) *MediaFileEventsService {
	return &MediaFileEventsService{mediaFileEventsRepositoriy: mediaFileEventsRepo}
}

func (s *MediaFileEventsService) AddFile(file *generate_models.Mediafileforevent) error {
	return s.mediaFileEventsRepositoriy.AddFile(file)
}

func (s *MediaFileEventsService) DeleteFile(file *generate_models.Mediafileforevent) error {
	return s.mediaFileEventsRepositoriy.DeleteFile(file)
}

func (s *MediaFileEventsService) UpdateFile(file *generate_models.Mediafileforevent) error {
	return s.mediaFileEventsRepositoriy.UpdateFile(file)
}

func (s *MediaFileEventsService) FindByIdFile(id uint) (*generate_models.Mediafileforevent, error) {
	return s.mediaFileEventsRepositoriy.FindByIdFile(id)
}

func (s *MediaFileEventsService) FindAllFile(idEvent uint) ([]*generate_models.Mediafileforevent, error) {
	images, err := s.mediaFileEventsRepositoriy.FindAllFile(idEvent)
	if err != nil {
		return nil, fmt.Errorf("Database error: %v", err)
	}
	if len(images) == 0 {
		return nil, nil
	}
	return images, err
}
