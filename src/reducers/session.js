import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  PUSH_ENABLE,
  PUSH_DISABLE,
} from 'base/constants';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
  pushEnabled: false,
});

function sessionReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_USER_PENDING:
      return state.merge(fromJS({
        token: null,
        user: {},
        hasError: false,
        isLoading: true,
      }));
    case LOGIN_USER_SUCCESS:
      return state.merge(fromJS({
        token: action.payload.token,
        user: action.payload.profile,
        hasError: false,
        isLoading: false,
      }));
    case LOGIN_USER_ERROR:
      return state.merge(fromJS({
        hasError: true,
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
    case LOGOUT_USER:
      return state.merge(INITIAL_STATE);
    default:
      return state;
  }
}

export default sessionReducer;
