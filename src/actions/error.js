export const ADD_ERROR = 'App/ADD_ERROR';
export function addError(error) {
  return {
    type: ADD_ERROR,
    error: error,
  };
}

export const REMOVE_ERROR = 'App/REMOVE_ERROR';
export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
