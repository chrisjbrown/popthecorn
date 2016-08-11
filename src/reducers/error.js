import { ADD_ERROR, REMOVE_ERROR } from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  message: null,
});

function errorReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ADD_ERROR:
      return state.merge(fromJS({
        message: action.error,
      }));
    case REMOVE_ERROR:
      return state.merge(fromJS({
        message: null,
      }));
    default:
      return state;
  }
}

export default errorReducer;
