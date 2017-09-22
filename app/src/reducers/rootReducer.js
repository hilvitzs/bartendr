import { combineReducers } from 'redux';
import asyncRequests from './asyncRequestReducer';
import error from './errorReducer';
import currentUser from './currentUserReducer';
import recipes from './recipeReducer';

const rootReducer = combineReducers({
  asyncRequests,
  error,
  currentUser,
  recipes
});

export default rootReducer;