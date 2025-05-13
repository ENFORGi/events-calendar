package controllers

import (
	"backend/services"
	"backend/utils"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/gorilla/mux"
	_ "strconv"
)

type UserController struct {
	serviceManager *services.ServiceManager
}

type AuthRequest struct {
	Name string `json:"name"`
	Mail string `json:"mail"`
}

type AuthResponseDTO struct {
	ID      int32  `json:"id"`
	Name    string `json:"name"`
	Mail    string `json:"mail"`
	IsAdmin bool   `json:"isadmin"`
	Token   string `json:"token"`
}

type UserDTO struct {
	ID      int32  `json:"id"`
	Name    string `json:"name"`
	Mail    string `json:"mail"`
	IsAdmin bool   `json:"isadmin"`
}

func NewUserController(sm *services.ServiceManager) *UserController {
	return &UserController{serviceManager: sm}
}

// === Auth ===
func (uc *UserController) Auth(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if req.Name == "" || req.Mail == "" {
		http.Error(w, "Name and mail are required", http.StatusBadRequest)
		return
	}

	user, err := uc.serviceManager.User.FindByMailUser(req.Mail)
	if err != nil {
		http.Error(w, fmt.Sprintf("Database error: %v", err), http.StatusInternalServerError)
		return
	}
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	if user.Name != req.Name {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	resp := AuthResponseDTO{
		ID:      user.ID,
		Name:    user.Name,
		Mail:    user.Mail,
		IsAdmin: user.Isadmin,
		Token:   token,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
