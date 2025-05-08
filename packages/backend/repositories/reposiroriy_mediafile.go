package repositories

import (
	"backend/models/generate_models"
	"gorm.io/gorm"
)

type MediaFileRepositoriy struct {
	db *gorm.DB
}

func NewMediaFileRepositoriy(db *gorm.DB) *MediaFileRepositoriy {
	return &MediaFileRepositoriy{db: db}
}

func (r *MediaFileRepositoriy) CreateFile(file *generate_models.Mediafile) error {
	return r.db.Create(file).Error
}

func (r *MediaFileRepositoriy) DeleteFile(file *generate_models.Mediafile) error {
	return r.db.Delete(&generate_models.Mediafile{}, file.ID).Error
}

func (r *MediaFileRepositoriy) UpdateFile(file *generate_models.Mediafile) error {
	return r.db.Save(file).Error
}

func (r *MediaFileRepositoriy) FindByIdFile(id uint) (*generate_models.Mediafile, error) {
	var file *generate_models.Mediafile
	err := r.db.First(&file, id).Error
	return file, err
}
