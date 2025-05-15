package controllers

import (
	"backend/services"
	"backend/utils"

	"encoding/json"
	"fmt"
	"net/http"
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
	request, ok := utils.DecodeBodyJSONRequest[AuthRequest](r, w)
	if !ok {
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if request.Name == "" || request.Mail == "" {
		http.Error(w, "Name and mail are required", http.StatusBadRequest)
		return
	}

	user, err := uc.serviceManager.User.FindByMailUser(request.Mail)
	if err != nil {
		http.Error(w, fmt.Sprintf("Database error: %v", err), http.StatusInternalServerError)
		return
	}
	if user == nil {
		http.Error(w, fmt.Sprintf("Error, not found user"), http.StatusNotFound)
		return
	}
	if user.Name != request.Name {
		http.Error(w, fmt.Sprintf("Error, not found user"), http.StatusNotFound)
		return
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	response := AuthResponseDTO{
		ID:      user.ID,
		Name:    user.Name,
		Mail:    user.Mail,
		IsAdmin: user.Isadmin,
		Token:   token,
	}

	utils.RespondWithJSON(w, response)
}
