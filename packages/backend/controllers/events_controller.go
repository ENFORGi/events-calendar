package controllers

import (
	"backend/models/generate_models"
	"backend/services"
	"backend/utils"

	"fmt"
	"net/http"
	"time"
)

type EventsController struct {
	ServiceManager *services.ServiceManager
}
type GetUserIdRequest struct {
	IDUser uint `json:"idUser"`
}
type GetUserEventsByDateRequest struct {
	UserId    uint   `json:"userId"`
	DateStart string `json:"dateStart"`
	DateEnd   string `json:"dateEnd"`
}
type GetEventIdRequest struct {
	EventId uint `json:"eventId"`
}
type UpdateUserEventRequest struct {
	ID               int32   `json:"id"`
	Iduser           *int32  `json:"idUser"`
	Idevents         *int32  `json:"idEvents"`
	Attendance       *string `json:"attendance,omitempty"`
	Notificationtime *string `json:"notificationtime,omitempty"`
}
type EventRequest struct {
	ID           *int32  `json:"id,omitempty"`
	Idivc        *int32  `json:"idivc"`
	Name         *string `json:"name"`
	Description  *string `json:"description"`
	Datestart    *string `json:"datestart"`
	Dateend      *string `json:"dateend"`
	Typeoc       *bool   `json:"typeoc"`
	Placeadress  *string `json:"placeadress"`
	Usercreater  *int32  `json:"usercreater"`
	Typeevents   *int32  `json:"typeevents"`
	Subtypeevent *int32  `json:"subtypeevent"`
}

func NewEventsController(sm *services.ServiceManager) *EventsController {
	return &EventsController{ServiceManager: sm}
}

// ==Events==
func (ec *EventsController) GetUserCategories(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[GetUserIdRequest](r, w)
	if !ok {
		return
	}

	userEvents, err := ec.ServiceManager.Usersevent.GetEvents(request.IDUser)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}

	if len(userEvents) == 0 {
		http.Error(w, fmt.Sprintf("Error, not found user event: %v", err), http.StatusNotFound)
		return
	}

	typeEventsMap := make(map[int32]string)
	for _, event := range userEvents {
		typeEvent, err := ec.ServiceManager.Typeevent.FindByIdTypeEvents(uint(event.Typeevents))
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to get type event: %v", err), http.StatusInternalServerError)
			return
		}
		typeEventsMap[typeEvent.ID] = typeEvent.Name
	}

	// Ответ
	var response []map[string]interface{}

	for typeEventId, typeEventName := range typeEventsMap {
		subTypes, err := ec.ServiceManager.Subtypeevent.FindAllSubTypeEventsByIdEvents(uint(typeEventId))
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to get subtypes: %v", err), http.StatusInternalServerError)
			return
		}

		var options []map[string]interface{}
		for _, subType := range subTypes {
			options = append(options, map[string]interface{}{
				"label": fmt.Sprintf("<span> %s </span>", subType.Name),
				"value": subType.Name,
			})
		}

		response = append(response, map[string]interface{}{
			"label":   fmt.Sprintf("<span> %s </span>", typeEventName),
			"title":   typeEventName,
			"options": options,
		})
	}
	utils.RespondWithJSON(w, response)
}

func (ec *EventsController) GetUserEvents(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[GetUserIdRequest](r, w)
	if !ok {
		return
	}

	userEvents, err := ec.ServiceManager.Usersevent.GetUserEvents(request.IDUser)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}

	if len(userEvents) == 0 {
		http.Error(w, fmt.Sprintf("Error, not found user event: %v", err), http.StatusNotFound)
		return
	}

	var response []map[string]interface{}

	for _, userEvent := range userEvents {
		event, err := ec.ServiceManager.Event.FindByIdEvent(uint(userEvent.Idevents))
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to get event: %v", err), http.StatusInternalServerError)
			return
		}

		eventData := map[string]interface{}{
			"idEvents":         userEvent.Idevents,
			"attendance":       userEvent.Attendance,
			"notificationTime": userEvent.Notificationtime,
			"eventInfo": map[string]interface{}{
				"name": event.Name,
			},
		}

		response = append(response, eventData)
	}

	utils.RespondWithJSON(w, response)
}

// Можно и без даты, либо можно указать какую-то конкретную дату.
// Например только дату окончания или дату начала.
func (ec *EventsController) GetUserEventsByDate(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[GetUserEventsByDateRequest](r, w)
	if !ok {
		return
	}

	events, err := ec.ServiceManager.Event.GetUserEventsByDate(request.UserId, request.DateStart, request.DateEnd)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}
	if len(events) == 0 {
		http.Error(w, fmt.Sprintf("Error, not found events: %v", err), http.StatusNotFound)
		return
	}

	var response []map[string]interface{}

	for _, event := range events {
		eventData := map[string]interface{}{
			"eventId":   event.ID,
			"dateStart": event.Datestart.Format("2006-01-02 15:04:05"),
			"dateEnd":   event.Dateend.Format("2006-01-02 15:04:05"),
		}
		response = append(response, eventData)
	}

	utils.RespondWithJSON(w, response)
}

func (ec *EventsController) GetUserEvent(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[GetEventIdRequest](r, w)
	if !ok {
		return
	}

	event, err := ec.ServiceManager.Event.FindByIdEvent(request.EventId)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}

	if event == nil {
		http.Error(w, fmt.Sprintf("Error, not found event: %v", err), http.StatusNotFound)
		return
	}

	images, err := ec.ServiceManager.Mediafileforevent.FindAllFile(request.EventId)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}

	if images == nil {
		http.Error(w, fmt.Sprintf("Error, not found images: %v", err), http.StatusNotFound)
		return
	}

	var imageURLs []string
	for _, imgForEvents := range images {
		img, err := ec.ServiceManager.Mediafile.FindByIdFile(uint(imgForEvents.ID))
		if err != nil {
			fmt.Printf("Error: %v", err)
			continue
		}
		if img != nil {
			imageURLs = append(imageURLs, img.URL)
		}

	}

	ivc, err := ec.ServiceManager.Ivc.FindByIdIvc(uint(event.Idivc))
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
	}
	if ivc == nil {
		http.Error(w, fmt.Sprintf("Error, not found IVC"), http.StatusNotFound)
	}

	userCreator, err := ec.ServiceManager.User.FindByIdUser(uint(event.Usercreater))
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
	}
	if userCreator == nil {
		http.Error(w, fmt.Sprintf("Error, not found user"), http.StatusNotFound)
	}

	typeEvents, err := ec.ServiceManager.Typeevent.FindByIdTypeEvents(uint(event.Typeevents))
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
	}
	if typeEvents == nil {
		http.Error(w, fmt.Sprintf("Error, not found type events"), http.StatusNotFound)
	}

	response := map[string]interface{}{
		"title":       event.Name,
		"description": event.Description,
		"dateStart":   event.Datestart.Format("2006-01-02 15:04:05"),
		"dateEnd":     event.Dateend.Format("2006-01-02 15:04:05"),
		"image":       imageURLs,
		"other": map[string]interface{}{
			"id":          event.ID,
			"ivc":         ivc.Name,
			"typeOC":      event.Typeoc,
			"placeAdress": event.Placeadress,
			"userCreator": userCreator.Name,
			"typeEvents":  typeEvents.Name,
		},
	}

	utils.RespondWithJSON(w, response)
}

func (ec *EventsController) Notification(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[GetUserIdRequest](r, w)
	if !ok {
		return
	}

	userEvents, err := ec.ServiceManager.Usersevent.GetUserEvents(request.IDUser)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}

	if len(userEvents) == 0 {
		http.Error(w, fmt.Sprintf("Error, not found user event: %v", err), http.StatusNotFound)
		return
	}

	var response []map[string]interface{}

	for _, userEvent := range userEvents {
		event, err := ec.ServiceManager.Event.FindByIdEvent(uint(userEvent.Idevents))
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to get event: %v", err), http.StatusInternalServerError)
			return
		}

		eventData := map[string]interface{}{
			"name":      event.Name,
			"dateStart": event.Datestart,
			"dateEnd":   event.Dateend,
			"status":    userEvent.Attendance,
			"timeOfSet": userEvent.Notificationtime,
		}

		response = append(response, eventData)
	}

	utils.RespondWithJSON(w, response)
}

func (ec *EventsController) UpdateUserEvent(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[UpdateUserEventRequest](r, w)
	if !ok {
		return
	}

	existingEvent, err := ec.ServiceManager.Usersevent.GetUserEventById(uint(request.ID))
	if err != nil || existingEvent == nil {
		http.Error(w, "User event not found", http.StatusNotFound)
		return
	}

	if request.Attendance != nil {
		validValues := map[string]bool{"1": true, "2": true, "3": true}
		if !validValues[*request.Attendance] {
			http.Error(w, "Invalid attendance value. Allowed: 1, 2, 3", http.StatusBadRequest)
			return
		}
		existingEvent.Attendance = *request.Attendance
	}
	if request.Notificationtime != nil {
		_, err := time.Parse("15:04:05", *request.Notificationtime)
		if err != nil {
			http.Error(w, "Invalid notification time format. Use HH:MM:SS", http.StatusBadRequest)
			return
		}
		existingEvent.Notificationtime = *request.Notificationtime
	}

	err = ec.ServiceManager.Usersevent.UpdateUserEvent(existingEvent)
	if err != nil {
		http.Error(w, fmt.Sprintf("Update error: %v", err), http.StatusInternalServerError)
		return
	}

	utils.RespondWithJSON(w, map[string]string{"status": "updated"})
}

func (ec *EventsController) CreateOrUpdateEvent(w http.ResponseWriter, r *http.Request) {
	request, ok := utils.DecodeBodyJSONRequest[EventRequest](r, w)
	if !ok {
		return
	}

	isAdmin, err := ec.ServiceManager.User.CheckAdmin(uint(*request.Usercreater))
	if err != nil {
		http.Error(w, fmt.Sprintf("Error: %v", err), http.StatusInternalServerError)
		return
	}
	if !isAdmin {
		http.Error(w, "User not admin", http.StatusBadRequest)
		return
	}

	if request.Name == nil || request.Datestart == nil || request.Dateend == nil {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	startTime, err := time.Parse("2006-01-02T15:04", *request.Datestart)
	if err != nil {
		http.Error(w, "Invalid datestart format", http.StatusBadRequest)
		return
	}
	endTime, err := time.Parse("2006-01-02T15:04", *request.Dateend)
	if err != nil {
		http.Error(w, "Invalid dateend format", http.StatusBadRequest)
		return
	}

	event := generate_models.Event{
		Name:        *request.Name,
		Description: utils.DerefOr(request.Description, ""),
		Datestart:   startTime,
		Dateend:     endTime,
		Typeoc:      utils.DerefOr(request.Typeoc, true),
		Placeadress: utils.DerefOr(request.Placeadress, ""),
		Usercreater: utils.DerefOr(request.Usercreater, 1),
		Idivc:       utils.DerefOr(request.Idivc, 1),
		Typeevents:  utils.DerefOr(request.Typeevents, 1),
	}

	if request.ID != nil {
		event.ID = *request.ID
		err = ec.ServiceManager.Event.UpdateEvent(&event)
		if err != nil {
			http.Error(w, "Failed to update event", http.StatusInternalServerError)
			return
		}
		utils.RespondWithJSON(w, map[string]interface{}{"status": "updated", "eventId": event.ID})
		return
	}

	err = ec.ServiceManager.Event.CreateEvent(&event)
	if err != nil {
		http.Error(w, "Failed to create event", http.StatusInternalServerError)
		return
	}
	utils.RespondWithJSON(w, map[string]interface{}{"status": "created", "eventId": event.ID})
}
