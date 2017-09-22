import * as types from '../constants/actionTypes';

// Fetch list of recipes
const fetchRecipesRequest = () => ({ type: types.FETCH_RECIPES_REQUEST });
const fetchRecipesSuccess = json => ({
  type: types.FETCH_RECIPES_SUCCESS,
  recipes: json
});
const fetchRecipesFailure = error => ({ type: types.FETCH_RECIPES_FAILURE, error });
export const fetchRecipes = () => (
  dispatch => {
    dispatch(fetchRecipesRequest());
    return fetch('/api/recipes/')
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          dispatch(fetchRecipesSuccess(json));
        });
      } else {
        response.json().then(({ error }) => {
          dispatch(fetchRecipesFailure({
            code: response.status,
            statusText: response.statusText,
            error
          }));
        });
      }
    });
  }
);

// Fetch a single recipe
const fetchRecipeRequest = id => ({ type: types.FETCH_RECIPE_REQUEST, id });
const fetchRecipeSuccess = json => ({
  type: types.FETCH_RECIPE_SUCCESS,
  recipe: json
});
const fetchRecipeFailure = error => ({ type: types.FETCH_RECIPE_FAILURE, error });
export const fetchRecipe = id => (
  dispatch => {
    dispatch(fetchRecipeRequest(id));
    return fetch(`/api/recipes/${id}`)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          dispatch(fetchRecipeSuccess(json));
        });
      } else {
        response.json().then(({ error }) => {
          dispatch(fetchRecipeFailure({
            code: response.status,
            statusText: response.statusText,
            error
          }));
        });
      }
    });
  }
);

// Create a single recipe
const createRecipeRequest = recipe => ({ type: types.CREATE_RECIPE_REQUEST, recipe });
const createRecipeSuccess = recipe => ({ type: types.CREATE_RECIPE_SUCCESS, recipe });
const createRecipeFailure = error => ({ type: types.CREATE_RECIPE_FAILURE, error });
export const createRecipe = recipe => (
  dispatch => {
    dispatch(createRecipeRequest(recipe));
    return fetch(`/api/recipes/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(response => {
      if (response.ok) {
        dispatch(createRecipeSuccess(recipe));
      } else {
        response.json().then(({ error })=> {
          dispatch(createRecipeFailure({
            code: response.status,
            statusText: response.statusText,
            error
          }));
        });
      }
    });
  }
);

// Update a single recipe
const updateRecipeRequest = recipe => ({ type: types.UPDATE_RECIPE_REQUEST, recipe });
const updateRecipeSuccess = recipe => ({ type: types.UPDATE_RECIPE_SUCCESS, recipe });
const updateRecipeFailure = error => ({ type: types.UPDATE_RECIPE_FAILURE, error });
export const updateRecipe = recipe => (
  dispatch => {
    dispatch(updateRecipeRequest(recipe));
    return fetch(`/api/recipes/${recipe.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(response => {
      if (response.ok) {
        dispatch(updateRecipeSuccess(recipe));
      } else {
        response.json().then(({ error })=> {
          dispatch(updateRecipeFailure({
            code: response.status,
            statusText: response.statusText,
            error
          }));
        });
      }
    });
  }
);

// Delete a single recipe
const deleteRecipeRequest = id => ({ type: types.DELETE_RECIPE_REQUEST, id });
const deleteRecipeSuccess = id => ({ type: types.DELETE_RECIPE_SUCCESS, id });
const deleteRecipeFailure = error => ({ type: types.DELETE_RECIPE_FAILURE, error });
export const deleteRecipe = id => (
  dispatch => {
    dispatch(deleteRecipeRequest(id));
    fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        dispatch(deleteRecipeSuccess(id));
      } else {
        response.json().then(({ error })=> {
          dispatch(deleteRecipeFailure({
            code: response.status,
            statusText: response.statusText,
            error
          }));
        });
      }
    });
  }
);