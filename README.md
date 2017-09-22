# Bartendr

Bartendr is an web app for keeping track of cocktail recipes. You're going to help polish it up.

### Requirements:
  - [Git](https://git-scm.com/downloads)
  - [Node & NPM](https://nodejs.org/en/)
  - [Go](https://golang.org/dl/) >=1.6
  - [Google Cloud SDK](https://cloud.google.com/appengine/docs/standard/go/download)
    - App Engine extension for Go: `gcloud components install app-engine-go`
  - [Python](https://www.python.org/downloads/) >=2.7.9 (Required to run `dev_server.py`)
  
---

### Getting Started:

`git clone` this repository to `$GOPATH/src`

`cd $GOPATH/src/bartendr/app`

`npm install`

Run locally:

`npm start`

To populate the local Datastore with sample data, visit `localhost:8080/api/load-sample-data`

Deploy app: (Must run `gcloud init` before the first time you deploy)

`npm run deploy`

---

### About the app:

The app is built on [Appengine](https://cloud.google.com/appengine/docs/standard/go/). It consists of two main pieces - a JSON REST API and a React single-page app. Much of it is probably unfamiliar to you, which is intentional. We want to see how you approach working on an existing project. The app requires you to log in with your Google account (but uses a fake account when run on the local dev server) to do anything. All requests that begin with /api/* are handled by the Go application. All other requests just serve up index.html, which contains a script tag to load our bundled JavaScript code. You shouldn't need to fix any bugs. If you find a bug, it was not intentional and I am sorry...  

---

### Challenge:

Your job is to complete three tasks. Two are implementation challenges and one is an open-ended design problem.
 1) Implement a display page for a recipe. There is a start of the component in `app/src/containers/RecipePage.js` with some more specs.
 2) Implement a form component for creating and updating a recipe. You can find the start of this component in `app/src/components/RecipeForm.js` along with some more detailed requirements.
 3) Design a new feature for the app. This can be as simple or extravagant as you'd like, but try to pick an idea that you think won't take more than a couple of hours. We don't want you to go insane. If you have an awesome idea but won't be able to finish it in a reasonable amount of time, create a detailed plan for your feature.  Be creative, or try one of these:
 	- Recipe reviews
 	- Star ratings
 	- Upload images
 	- Bookmark recipes
 	- Filters (filter results by category, ingredient, etc.)
  
We are looking for correctness (does it work?) as well as your approach to the problems.

---

### Submission:

Three things:
 - Deploy your app - Create a new project in the [Google Cloud Platform Console](https://console.cloud.google.com/), then run:
    - `gcloud init` and follow the prompts
    - `gcloud app create` and follow the prompts
    - `npm run deploy` and follow the prompts
 - Add a `README.md` (just replace this one) in the project folder with a link to the live app and an explanation of your new feature
 - Email us your project in a `.zip` file. Be sure not to include `node_modules`

---

### Tips:
 - Use Chrome DevTool extensions: [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en), [Redux DevTools](http://extension.remotedev.io/#installation)
 - Download Go extensions for you text editor. These are a must-have.
 - Use 3rd-party libraries and packages if you want. Don't reinvent the wheel.
 - Leave comments where necessary.

---

### Reference:
- [Appengine (standard environment)](https://cloud.google.com/appengine/docs/standard/go/)
- [Datastore](https://cloud.google.com/appengine/docs/standard/go/datastore/reference)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Webpack](https://webpack.github.io/)
- [Bootstrap v4](https://v4-alpha.getbootstrap.com/)
