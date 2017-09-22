package bartendr

import (
	"net/http"

	"bartendr/api"

	"google.golang.org/appengine"
)

func init() {
	if appengine.IsDevAppServer() {
		http.HandleFunc("/api/load-sample-data", api.HandleLoadSampleData("data/recipes.json"))
	}
	http.HandleFunc("/api/recipes/", api.HandleRecipes)
	http.HandleFunc("/", api.HandleIndexTemplate("src/index.html"))
}
