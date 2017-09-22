package api

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"time"

	"golang.org/x/net/context"

	"google.golang.org/appengine/datastore"
)

// recipe represents a single cocktail recipe
type recipe struct {
	Key         *datastore.Key `json:"id" datastore:"-"`
	Created     time.Time      `json:"created"`
	Name        string         `json:"name" datastore:",noindex"`
	Glass       string         `json:"glass,omitempty" datastore:",noindex"`
	Category    string         `json:"category"`
	Ingredients []ingredient   `json:"ingredients"`
	Special     []string       `json:"special,omitempty" datastore:",noindex"`
	Garnish     string         `json:"garnish,omitempty" datastore:",noindex"`
	Preparation string         `json:"preparation" datastore:",noindex"`
	Rating      int            `json:"rating"`
	User        user           `json:"user"`
}

type ingredient struct {
	Name   string  `json:"name"`
	Unit   string  `json:"unit" datastore:",noindex"`
	Amount float64 `json:"amount" datastore:",noindex"`
}

// valid checks if a Recipe is valid
func (r recipe) valid() error {
	if len(r.Name) < 0 {
		return errors.New("recipe name required")
	}
	return nil
}

// create puts a single recipe in the datastore
func (r *recipe) create(c context.Context) error {
	if r.Key == nil {
		r.Key = datastore.NewIncompleteKey(c, "Recipe", nil)
	}
	r.Created = time.Now()
	u, err := getUser(c)
	if err != nil {
		return err
	}
	r.User = *u
	_, err = datastore.Put(c, r.Key, r)
	if err != nil {
		return err
	}
	return nil
}

// update updates a single recipe in the datastore. Basically
// the same as Create, but does not update Created time
func (r *recipe) update(c context.Context) error {
	// Get the current user
	u, err := getUser(c)
	if err != nil {
		return err
	}
	// Get the recipe from the datastore
	recipe, err := getRecipe(c, r.Key)
	if err != nil {
		return err
	}
	// Check if the user is allowed to update the recipe
	if recipe[0].User.ID != u.ID {
		return errNotAllowed
	}
	// Copy the user ID from the current user
	// since it will  be the same
	r.User.ID = u.ID
	// Put it in the datastore
	_, err = datastore.Put(c, r.Key, r)
	if err != nil {
		return err
	}
	return nil
}

// getRecipe gets a single Recipe from the datastore.
// It returns a slice so we always return an array from the api
func getRecipe(c context.Context, key *datastore.Key) ([]*recipe, error) {
	var r recipe
	err := datastore.Get(c, key, &r)
	if err != nil {
		return nil, err
	}
	r.Key = key
	r.User.Key = datastore.NewKey(c, "User", r.User.ID, 0, nil)
	return []*recipe{&r}, nil
}

// deleteRecipe deletes a single recipe from the datastore
func deleteRecipe(c context.Context, key *datastore.Key) error {
	// Get the current user
	u, err := getUser(c)
	if err != nil {
		return err
	}
	// Get the recipe from the datastore
	r, err := getRecipe(c, key)
	if err != nil {
		return err
	}
	// Check if the user is allowed to delete the recipe
	if r[0].User.ID != u.ID {
		return errNotAllowed
	}
	// Delete the recipe
	err = datastore.Delete(c, key)
	if err != nil {
		return err
	}
	return nil
}

// topRecipes returns the top 25 highest rated drink recipes
func topRecipes(c context.Context) ([]*recipe, error) {
	recipes := []*recipe{}
	recipeKeys, err := datastore.NewQuery("Recipe").
		Order("-Rating").
		Order("-Created").
		Limit(25).
		GetAll(c, &recipes)
	if err != nil {
		return nil, err
	}
	for i := range recipes {
		recipes[i].Key = recipeKeys[i]
	}
	return recipes, nil
}

// loadSampleRecipes loads recipes from a json file
func loadSampleRecipes(c context.Context, filename string) error {
	// Read JSON file into slice of Recipes
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}
	var recipes []*recipe
	err = json.Unmarshal(data, &recipes)
	if err != nil {
		return err
	}
	// Get current user to assign to these recipes
	u, err := getUser(c)
	if err != nil {
		return err
	}
	// Store recipes in the datastore
	keys := []*datastore.Key{}
	for _, r := range recipes {
		keys = append(keys, datastore.NewIncompleteKey(c, "Recipe", nil))
		r.Created = time.Now()
		r.User = *u
	}
	_, err = datastore.PutMulti(c, keys, recipes)
	if err != nil {
		return err
	}
	return nil
}
