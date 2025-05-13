package services

import (
	"backend/models/generate_models"
	"backend/repositories"
	"fmt"
)

type IvcService struct {
	ivcRepositoriy *repositories.IvcRepositoriy
}

func NewIvcService(ivcRepo *repositories.IvcRepositoriy) *IvcService {
	return &IvcService{ivcRepositoriy: ivcRepo}
}

func (s *IvcService) CreateIvc(ivc *generate_models.Ivc) error {
	return s.ivcRepositoriy.CreateIvc(ivc)
}

func (s *IvcService) DeleteIvc(id uint) error {
	return s.ivcRepositoriy.DeleteIvc(id)
}

func (s *IvcService) UpdateIvc(ivc *generate_models.Ivc) error {
	return s.ivcRepositoriy.UpdateIvc(ivc)
}

func (s *IvcService) FindByIdIvc(id uint) (*generate_models.Ivc, error) {
	return s.ivcRepositoriy.FindByIdIvc(id)
}

func (s *IvcService) FindAllIvc() ([]*generate_models.Ivc, error) {
	ivcs, err := s.ivcRepositoriy.FindAllIvc()
	if ivcs == nil || err != nil {
		if ivcs == nil {
			return nil, fmt.Errorf("couldn't get ivc data: %v", err)
		}
		if err != nil {
			return ivcs, fmt.Errorf("error: %v", err)
		}
	}
	return ivcs, err
}
