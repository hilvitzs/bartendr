export default function(state = 0, action) {
  if (action.type.endsWith('_REQUEST')) {
    return state + 1;
  } else if (action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE')) {
    return state - 1;
  }

  return state;
}