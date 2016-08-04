import { ADD_ERROR, REMOVE_ERROR } from 'base/constants';

export function addError(error) {
  return {
    type: ADD_ERROR,
    error: error,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
