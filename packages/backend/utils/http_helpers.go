package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// DecodeJSONRequest чтение тела JSON-запроса
func DecodeBodyJSONRequest[T any](r *http.Request, w http.ResponseWriter) (*T, bool) {
	var req T
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return nil, false
	}
	return &req, true
}

// RespondWithJSON отправка JSON-ответа
func RespondWithJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, fmt.Sprintf("Failed to encode response: %v", err), http.StatusInternalServerError)
	}
}

func DerefOr[T any](ptr *T, def T) T {
	if ptr != nil {
		return *ptr
	}
	return def
}
