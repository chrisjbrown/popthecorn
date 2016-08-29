import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  PUSH_ENABLE,
  PUSH_DISABLE,
} from 'app/actions';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  token: null,
  user: {},
  dataError: '',
  isLoading: false,
  pushEnabled: false,
});

function sessionReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.merge(fromJS({
        token: null,
        user: {},
        dataError: '',
        isLoading: true,
      }));
    case LOGIN_SUCCESS:
      return state.merge(fromJS({
        token: '123',
        user: action.payload.user,
        dataError: '',
        isLoading: false,
      }));
    case LOGIN_ERROR:
      return state.merge(fromJS({
        dataError: action.payload.error,
        isLoading: false,
      }));
    case PUSH_ENABLE:
      return state.merge(fromJS({
        pushEnabled: true,
      }));
    case PUSH_DISABLE:
      return state.merge(fromJS({
        pushEnabled: false,
      }));
    case LOGOUT:
      return state.merge(INITIAL_STATE);
    default:
      return state;
  }
}

export default sessionReducer;
