package models

import (
	"fmt"
	"gorm.io/gen"
	"gorm.io/gorm"
	"os"
	"path/filepath"
)

// findProjectRoot ищет корень проекта по наличию go.mod
func findProjectRoot() (string, error) {
	// dir, err := os.Getwd()
	// if err != nil {
	// 	return "", err
	// }

	// fmt.Println("Current working directory:", dir)

	// for {
	// 	if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
	// 		return dir, nil
	// 	}
	// 	parent := filepath.Dir(dir)
	// 	if parent == dir {
	// 		return "", fmt.Errorf("project root not found")
	// 	}
	// 	dir = parent
	// }
	return "/app", nil
}

func GenerateTable(db *gorm.DB) error {
	root, err := findProjectRoot()
	if err != nil {
		return fmt.Errorf("failed to find project root: %w", err)
	}

	baseDir := filepath.Join(root, "models", "generate_models")

	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}

	g := gen.NewGenerator(gen.Config{
		OutPath:      baseDir,
		ModelPkgPath: "generate_models",
		Mode:         gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	g.UseDB(db)
	g.GenerateAllTable()
	g.Execute()
	return nil
}
