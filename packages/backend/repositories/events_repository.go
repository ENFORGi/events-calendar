package repositories

import (
	"backend/models/generate_models"

	"gorm.io/gorm"
)

type EventsRepositoriy struct {
	db *gorm.DB
}

func NewEventsRepositoriy(db *gorm.DB) *EventsRepositoriy {
	return &EventsRepositoriy{db: db}
}

func (r *EventsRepositoriy) CreateEvent(event *generate_models.Event) error {
	return r.db.Create(event).Error
}

func (r *EventsRepositoriy) DeleteEvent(id uint) error {
	return r.db.Delete(&generate_models.Event{}, id).Error
}

func (r *EventsRepositoriy) UpdateEvent(event *generate_models.Event) error {
	return r.db.Save(event).Error
}

func (r *EventsRepositoriy) FindByIdEvent(id uint) (*generate_models.Event, error) {
	var event generate_models.Event
	err := r.db.First(&event, id).Error
	return &event, err
}

func (r *EventsRepositoriy) GetUserEventsByDate(userID uint, dateStart string, dateEnd string) ([]*generate_models.Event, error) {
	var events []*generate_models.Event

	query := r.db.Model(&generate_models.Event{}).
		Joins("JOIN usersevents ON usersevents.idevents = events.id").
		Where("usersevents.iduser = ?", userID)

	if dateStart != "" {
		query = query.Where("events.datestart >= ?", dateStart)
	}
	if dateEnd != "" {
		query = query.Where("events.dateend <= ?", dateEnd)
	}

	err := query.Find(&events).Error
	return events, err
}

func (r *EventsRepositoriy) EventsByAccessType(typeEv bool) ([]*generate_models.Event, error) {
	var events []*generate_models.Event
	err := r.db.Where("Typeoc = ?", typeEv).Find(&events).Error
	return events, err
}

func (r *EventsRepositoriy) EventsByType(typeEv string) ([]*generate_models.Event, error) {
	var events []*generate_models.Event
	err := r.db.Where("Typeevents = ?", typeEv).Find(&events).Error
	return events, err
}

func (r *EventsRepositoriy) EventsByIvc(idIvc int) ([]*generate_models.Event, error) {
	var events []*generate_models.Event
	err := r.db.Where("Idivc = ?", idIvc).Find(&events).Error
	return events, err
}

func (r *EventsRepositoriy) EventsByName(name string) (*generate_models.Event, error) {
	var event *generate_models.Event
	err := r.db.Where("Name = ?", name).Find(&event).Error
	return event, err
}

func (r *EventsRepositoriy) EventsSimilarNames(name string) ([]*generate_models.Event, error) {
	var events []*generate_models.Event
	err := r.db.Where("Name LIKE ?", "%"+name+"%").Find(&events).Error
	return events, err
}
