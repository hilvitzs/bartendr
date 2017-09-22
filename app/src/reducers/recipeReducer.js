import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.recipes, action) {
  switch(action.type) {
    case types.FETCH_RECIPES_SUCCESS:
      return action.recipes;
    case types.FETCH_RECIPE_SUCCESS:
      return action.recipe;
    case types.DELETE_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.filter(r => r.id != action.id)
      });
    default:
      return state;
  }
}