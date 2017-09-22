import initialState from './initialState';
import { CLEAR_ERROR } from '../constants/actionTypes';

export default function errors(state = initialState.error, action) {
  if (action.type.endsWith('_FAILURE')) {
    return action.error;
  }
  if (action.type === CLEAR_ERROR) {
    return null;
  }

  return state;
}