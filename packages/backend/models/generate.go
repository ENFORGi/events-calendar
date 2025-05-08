package models

import (
	"gorm.io/gen"
	"gorm.io/gorm"
)

func GenerateTable(db *gorm.DB) error {
	g := gen.NewGenerator(gen.Config{
		OutPath:      "generate_models",
		ModelPkgPath: "models/generate_models",
		Mode:         gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	g.UseDB(db)
	g.GenerateAllTable()
	g.Execute()
	return nil
}
