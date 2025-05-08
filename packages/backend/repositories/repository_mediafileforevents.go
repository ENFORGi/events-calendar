package repositories

import (
	"backend/models/generate_models"
	"gorm.io/gorm"
)

type MediaFileEventsRepositoriy struct {
	db *gorm.DB
}

func NewMediaFileEventsRepositoriy(db *gorm.DB) *MediaFileEventsRepositoriy {
	return &MediaFileEventsRepositoriy{db: db}
}

func (r *MediaFileEventsRepositoriy) AddFile(file *generate_models.Mediafileforevent) error {
	return r.db.Create(file).Error
}

func (r *MediaFileEventsRepositoriy) DeleteFile(file *generate_models.Mediafileforevent) error {
	return r.db.Delete(&generate_models.Mediafileforevent{}, file.ID).Error
}

func (r *MediaFileEventsRepositoriy) UpdateFile(file *generate_models.Mediafileforevent) error {
	return r.db.Save(file).Error
}

func (r *MediaFileEventsRepositoriy) FindByIdFile(id uint) (*generate_models.Mediafileforevent, error) {
	var file *generate_models.Mediafileforevent
	err := r.db.First(&file, id).Error
	return file, err
}

func (r *MediaFileEventsRepositoriy) FindAllFile(idEvent uint) ([]*generate_models.Mediafileforevent, error) {
	var file []*generate_models.Mediafileforevent
	err := r.db.Find(&file, idEvent).Error
	return file, err
}
