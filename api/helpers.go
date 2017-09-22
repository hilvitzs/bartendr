package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
)

// parsePathParams matches url patterns and returns a map of variables
func parsePathParams(path, pattern string) map[string]string {
	params := make(map[string]string)
	pathSegs := strings.Split(strings.Trim(path, "/"), "/")
	for i, seg := range strings.Split(strings.Trim(pattern, "/"), "/") {
		if !strings.HasPrefix(seg, ":") {
			continue
		}
		key := strings.TrimPrefix(seg, ":")
		if i > len(pathSegs)-1 {
			params[key] = ""
		} else {
			params[key] = pathSegs[i]
		}
	}
	return params
}

// respondJSON sends a JSON response with v as its payload
func respondJSON(c context.Context, w http.ResponseWriter, r *http.Request, v interface{}, code int) {
	b, err := json.Marshal(v)
	if err != nil {
		respondErr(c, w, r, err, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	_, err = w.Write(b)
	if err != nil {
		log.Errorf(c, "respondJSON:  %v", err)
	}
}

// respondErr sends a JSON response with an error message and sets the status code
func respondErr(c context.Context, w http.ResponseWriter, r *http.Request, e error, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	err := json.NewEncoder(w).Encode(map[string]string{
		"error": e.Error(),
	})
	if err != nil {
		log.Errorf(c, "respondErr:  %v", err)
	}
}
