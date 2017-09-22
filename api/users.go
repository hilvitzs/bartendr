package api

import (
	"errors"
	"html/template"
	"net/http"
	"sync"

	"golang.org/x/net/context"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	aeu "google.golang.org/appengine/user"
)

// Errors specific to user
var (
	errNotAllowed  = errors.New("not allowed")
	errNotLoggedIn = errors.New("not logged in")
)

// User is a user of the app
type user struct {
	Key  *datastore.Key `json:"id" datastore:"-"`
	ID   string         `json:"-" datastore:",noindex"`
	Name string         `json:"name" datastore:",noindex"`
}

func getUser(c context.Context) (*user, error) {
	// Get current user from the context
	aeuser := aeu.Current(c)
	if aeuser == nil {
		return nil, errNotLoggedIn
	}
	// Try getting the user from the datastore
	var u user
	u.Key = datastore.NewKey(c, "User", aeuser.ID, 0, nil)
	err := datastore.Get(c, u.Key, &u)
	// There was an error other than ErrNoSuchEntity
	if err != nil && err != datastore.ErrNoSuchEntity {
		return nil, err
	}
	// A user was found. Return it
	if err == nil {
		return &u, nil
	}
	// The user is not in the datastore. Let's create it
	u.Name = aeuser.String()
	u.ID = aeuser.ID
	u.Key, err = datastore.Put(c, u.Key, &u)
	if err != nil {
		return nil, err
	}
	// Return newly created user
	return &u, nil
}

var compileTemplateOnce sync.Once
var tmpl *template.Template

// HandleIndexTemplate compiles the index template with
// the current user data injected into head tag
func HandleIndexTemplate(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		c := appengine.NewContext(r)
		u, err := getUser(c)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		compileTemplateOnce.Do(func() {
			tmpl = template.Must(template.ParseFiles(filename))
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		err = tmpl.Execute(w, map[string]interface{}{
			"currentUser": &u,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
