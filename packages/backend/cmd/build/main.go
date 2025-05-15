package main

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

func getProjectRoot() (string, error) {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		return "", fmt.Errorf("failed to get current file path")
	}

	root := filepath.Join(filepath.Dir(filename), "../../../..")
	absRoot, err := filepath.Abs(root)
	if err != nil {
		return "", fmt.Errorf("failed to get absolute path: %w", err)
	}
	return absRoot, nil
}

func main() {
	root, err := getProjectRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to determine project root: %v\n", err)
		os.Exit(1)
	}

	modelsDir := filepath.Join(root, "packages/backend/models/generate_models")
	genModelsScript := filepath.Join(root, "packages/backend/cmd/gen_models/main.go")
	mainScript := filepath.Join(root, "packages/backend/main.go")
	backendDir := filepath.Join(root, "packages/backend")

	if _, err := os.Stat(modelsDir); os.IsNotExist(err) {
		fmt.Println("Models directory does not exist, creating")
		if err := os.MkdirAll(modelsDir, 0755); err != nil {
			fmt.Fprintf(os.Stderr, "Failed to create models directory: %v\n", err)
			os.Exit(1)
		}
	} else if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to check models directory: %v\n", err)
		os.Exit(1)
	}

	empty, err := isDirEmpty(modelsDir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to check models directory: %v\n", err)
		os.Exit(1)
	}

	if empty {
		fmt.Println("Models directory is empty generating models")
		if err := runGoScript(genModelsScript, backendDir); err != nil {
			fmt.Fprintf(os.Stderr, "Failed to generate models: %v\n", err)
			os.Exit(1)
		}
	} else {
		fmt.Println("Models directory is not empty skipping model generation.")
	}

	fmt.Println("Starting the main application")
	if err := runGoScript(mainScript, backendDir); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to start application: %v\n", err)
		os.Exit(1)
	}
}

// isDirEmpty проверяет, пуста ли директория
func isDirEmpty(dir string) (bool, error) {
	f, err := os.Open(dir)
	if err != nil {
		return false, fmt.Errorf("failed to open directory: %w", err)
	}
	defer f.Close()

	_, err = f.Readdirnames(1)
	if err == nil {
		return false, nil
	}
	if err == io.EOF {
		return true, nil
	}
	return false, fmt.Errorf("failed to read directory: %w", err)
}

// runGoScript запускает Go-скрипт
func runGoScript(script, dir string) error {
	cmd := exec.Command("go", "run", script)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Dir = dir
	return cmd.Run()
}
