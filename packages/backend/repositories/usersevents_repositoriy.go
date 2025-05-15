package repositories

import (
	"backend/models/generate_models"

	"gorm.io/gorm"
)

type UserEventsRepositoriy struct {
	db *gorm.DB
}

func NewUserEventsRepositoriy(db *gorm.DB) *UserEventsRepositoriy {
	return &UserEventsRepositoriy{db: db}
}

func (r *UserEventsRepositoriy) CreateUserEvent(event *generate_models.Usersevent) error {
	return r.db.Create(event).Error
}

func (r *UserEventsRepositoriy) DeleteUserEvent(id uint) error {
	return r.db.Delete(&generate_models.Usersevent{}, id).Error
}

func (r *UserEventsRepositoriy) UpdateUserEvent(userEvent *generate_models.Usersevent) error {
	return r.db.Save(userEvent).Error
}

func (r *UserEventsRepositoriy) GetEvents(userID uint) ([]*generate_models.Event, error) {
	var events []*generate_models.Event
	err := r.db.
		Joins("JOIN usersevents ON usersevents.idevents = events.id").
		Where("usersevents.iduser = ?", userID).
		Find(&events).Error
	return events, err
}

func (r *UserEventsRepositoriy) GetUserEvents(userID uint) ([]generate_models.Usersevent, error) {
	var events []generate_models.Usersevent
	err := r.db.Where("iduser = ?", userID).Find(&events).Error
	return events, err
}

func (r *UserEventsRepositoriy) GetUserEventById(id uint) (*generate_models.Usersevent, error) {
	var event generate_models.Usersevent
	err := r.db.First(&event, id).Error
	return &event, err
}
