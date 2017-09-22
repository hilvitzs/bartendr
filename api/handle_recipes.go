package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

// HandleRecipes handles requests to do CRUD operations on recipes
func HandleRecipes(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		params := parsePathParams(r.URL.Path, "api/recipes/:id")
		if params["id"] != "" {
			handleRecipeGet(w, r, params["id"])
			return
		}
		handleTopRecipes(w, r)
	case "POST":
		handleRecipePost(w, r)
	case "PUT":
		params := parsePathParams(r.URL.Path, "api/recipes/:id")
		if params["id"] != "" {
			handleRecipePut(w, r, params["id"])
			return
		}
	case "DELETE":
		params := parsePathParams(r.URL.Path, "api/recipes/:id")
		if params["id"] != "" {
			handleRecipeDelete(w, r, params["id"])
			return
		}
	default:
		http.NotFound(w, r)
	}
}

func handleRecipeGet(w http.ResponseWriter, r *http.Request, id string) {
	c := appengine.NewContext(r)
	// Decode the id into a datstore key
	key, err := datastore.DecodeKey(id)
	if err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	// Get the recipe from the datastore
	recipe, err := getRecipe(c, key)
	if err != nil {
		if err == datastore.ErrNoSuchEntity {
			// Does not exist in the datastore
			respondErr(c, w, r, datastore.ErrNoSuchEntity, http.StatusNotFound)
			return
		}
		// Some other error
		respondErr(c, w, r, err, http.StatusInternalServerError)
		return
	}
	// Respond with the recipe
	respondJSON(c, w, r, recipe, http.StatusOK)
}

func handleRecipePost(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	var recipe recipe
	// Decode recipe into JSON from request body
	err := json.NewDecoder(r.Body).Decode(&recipe)
	if err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	// Check if the recipe is valid
	if err := recipe.valid(); err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	// Create the recipe in the datastore
	err = recipe.create(c)
	if err != nil {
		respondErr(c, w, r, err, http.StatusInternalServerError)
		return
	}
	// Set Location header and respond with the newly created recipe
	w.Header().Set("Location", "api/recipes/"+recipe.Key.Encode())
	respondJSON(c, w, r, recipe, http.StatusCreated)
}

func handleRecipePut(w http.ResponseWriter, r *http.Request, id string) {
	c := appengine.NewContext(r)
	// Decode the id into a datstore key
	key, err := datastore.DecodeKey(id)
	if err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	var recipe recipe
	// Decode recipe into JSON from request body
	err = json.NewDecoder(r.Body).Decode(&recipe)
	if err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	// Check if the recipe is valid
	if err := recipe.valid(); err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	// Set the recipe's Key to the id we got from the path
	recipe.Key = key
	// Update the recipe in the datastore
	err = recipe.update(c)
	if err != nil {
		if err == errNotAllowed {
			// The user is allowed to delete this recipe
			respondErr(c, w, r, errNotAllowed, http.StatusForbidden)
			return
		}
		// Some other error
		respondErr(c, w, r, err, http.StatusInternalServerError)
		return
	}
	// Success
	respondJSON(c, w, r, recipe, http.StatusOK)
}

func handleRecipeDelete(w http.ResponseWriter, r *http.Request, id string) {
	c := appengine.NewContext(r)
	// Decode the id into a datstore key
	key, err := datastore.DecodeKey(id)
	if err != nil {
		respondErr(c, w, r, err, http.StatusBadRequest)
		return
	}
	// Delete the recipe from the datastore
	err = deleteRecipe(c, key)
	if err != nil {
		if err == datastore.ErrNoSuchEntity {
			// The recipe does not exist in the datastore
			respondErr(c, w, r, datastore.ErrNoSuchEntity, http.StatusNotFound)
			return
		}
		if err == errNotAllowed {
			// The user is allowed to delete this recipe
			respondErr(c, w, r, errNotAllowed, http.StatusForbidden)
		}
		// Some other error
		respondErr(c, w, r, err, http.StatusInternalServerError)
		return
	}
	// Success
	respondJSON(c, w, r, nil, http.StatusNoContent)
}

func handleTopRecipes(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	recipes, err := topRecipes(c)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed getting recipes: %v", err), http.StatusInternalServerError)
	}
	respondJSON(c, w, r, recipes, http.StatusOK)
}

var loadDataOnce sync.Once

// HandleLoadSampleData loads sample data into the datastore
func HandleLoadSampleData(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		loadDataOnce.Do(func() {
			c := appengine.NewContext(r)
			err := loadSampleRecipes(c, filename)
			if err != nil {
				log.Errorf(c, "handleLoadSampleData: %s", err.Error())
				http.Error(w, "Failed loading sample recipes", http.StatusInternalServerError)
			}
		})
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
	}
}
