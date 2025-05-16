package repositories

import (
	"backend/models/generate_models"

	"gorm.io/gorm"
)

type TypeEventsRepositoriy struct {
	db *gorm.DB
}

func NewTypeEventsRepositoriy(db *gorm.DB) *TypeEventsRepositoriy {
	return &TypeEventsRepositoriy{db: db}
}

func (r *TypeEventsRepositoriy) CreateTypeEvents(typeEvent *generate_models.Typeevent) error {
	return r.db.Create(typeEvent).Error
}

func (r *TypeEventsRepositoriy) DeleteTypeEvents(id uint) error {
	return r.db.Delete(&generate_models.Typeevent{}, id).Error
}

func (r *TypeEventsRepositoriy) UpdateTypeEvents(typeEvent *generate_models.Typeevent) error {
	return r.db.Save(typeEvent).Error
}

func (r *TypeEventsRepositoriy) FindByIdTypeEvents(id uint) (*generate_models.Typeevent, error) {
	var typeEvent generate_models.Typeevent
	err := r.db.First(&typeEvent, id).Error
	return &typeEvent, err
}

func (r *TypeEventsRepositoriy) FindAllTypeEvents() ([]*generate_models.Typeevent, error) {
	var typeEvents []*generate_models.Typeevent
	err := r.db.Find(&typeEvents).Error
	return typeEvents, err
}
