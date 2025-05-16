package services

import (
	"backend/models/generate_models"
	"backend/repositories"
)

type MediaFileService struct {
	mediaFileRepositoriy *repositories.MediaFileRepositoriy
}

func NewMediaFileService(mediaFileEventsRepo *repositories.MediaFileRepositoriy) *MediaFileService {
	return &MediaFileService{mediaFileRepositoriy: mediaFileEventsRepo}
}

func (s *MediaFileService) AddFile(file *generate_models.Mediafile) error {
	return s.mediaFileRepositoriy.CreateFile(file)
}

func (s *MediaFileService) DeleteFile(file *generate_models.Mediafile) error {
	return s.mediaFileRepositoriy.DeleteFile(file)
}

func (s *MediaFileService) UpdateFile(file *generate_models.Mediafile) error {
	return s.mediaFileRepositoriy.UpdateFile(file)
}

func (s *MediaFileService) FindByIdFile(id uint) (*generate_models.Mediafile, error) {
	return s.mediaFileRepositoriy.FindByIdFile(id)
}
