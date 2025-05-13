package repositories

import (
	"backend/models/generate_models"

	"gorm.io/gorm"
)

type IvcRepositoriy struct {
	db *gorm.DB
}

func NewIvcRepositoriy(db *gorm.DB) *IvcRepositoriy {
	return &IvcRepositoriy{db: db}
}

func (r *IvcRepositoriy) CreateIvc(ivc *generate_models.Ivc) error {
	return r.db.Create(ivc).Error
}

func (r *IvcRepositoriy) DeleteIvc(id uint) error {
	return r.db.Delete(&generate_models.Ivc{}, id).Error
}

func (r *IvcRepositoriy) UpdateIvc(ivc *generate_models.Ivc) error {
	return r.db.Save(ivc).Error
}

func (r *IvcRepositoriy) FindByIdIvc(id uint) (*generate_models.Ivc, error) {
	var ivc generate_models.Ivc
	err := r.db.First(&ivc, id).Error
	return &ivc, err
}

func (r *IvcRepositoriy) FindAllIvc() ([]*generate_models.Ivc, error) {
	var ivcs []*generate_models.Ivc
	err := r.db.Find(&ivcs).Error
	return ivcs, err
}
