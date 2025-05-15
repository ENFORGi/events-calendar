package repositories

import (
	"backend/models/generate_models"

	"gorm.io/gorm"
)

type SubTypeEventsRepositoriy struct {
	db *gorm.DB
}

func NewSubTypeEventsRepositoriy(db *gorm.DB) *SubTypeEventsRepositoriy {
	return &SubTypeEventsRepositoriy{db: db}
}

func (r *SubTypeEventsRepositoriy) CreateSubTypeEvents(subTypeEvent *generate_models.Subtypeevent) error {
	return r.db.Create(subTypeEvent).Error
}

func (r *SubTypeEventsRepositoriy) DeleteSubTypeEvents(id uint) error {
	return r.db.Delete(&generate_models.Subtypeevent{}, id).Error
}

func (r *SubTypeEventsRepositoriy) UpdateSubTypeEvents(subTypeEvent *generate_models.Subtypeevent) error {
	return r.db.Save(subTypeEvent).Error
}

func (r *SubTypeEventsRepositoriy) FindByIdSubTypeEvents(id uint) (*generate_models.Subtypeevent, error) {
	var subTypeEvent generate_models.Subtypeevent
	err := r.db.First(&subTypeEvent, id).Error
	return &subTypeEvent, err
}

func (r *SubTypeEventsRepositoriy) FindAllSubTypeEventsByIdEvents(id uint) ([]*generate_models.Subtypeevent, error) {
	var subtypeEvents []*generate_models.Subtypeevent
	err := r.db.Where("idtypeevents = ?", id).Find(&subtypeEvents).Error
	return subtypeEvents, err
}
