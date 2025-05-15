package controllers

import (
	"backend/services"
	"backend/utils"

	"fmt"
	"net/http"
)

type IvcController struct {
	ServiceManager *services.ServiceManager
}

type IvcData struct {
	Value string `json:"key"`
	Label string `json:"label"`
}

func NewIvcController(sm *services.ServiceManager) *IvcController {
	return &IvcController{ServiceManager: sm}
}

func (ic *IvcController) GetIvcData(w http.ResponseWriter, r *http.Request) {
	ivc, err := ic.ServiceManager.Ivc.FindAllIvc()
	if err != nil {
		http.Error(w, fmt.Sprintf("Database error: %v", err), http.StatusInternalServerError)
		return
	}
	if ivc == nil {
		http.Error(w, fmt.Sprintf("Error, not found IVC"), http.StatusNotFound)
		return
	}

	var result []IvcData

	for _, item := range ivc {
		result = append(result, IvcData{
			Value: fmt.Sprintf("%d", item.ID),
			Label: item.Name,
		})
	}

	utils.RespondWithJSON(w, result)
}
