import { login } from 'base/api/auth/';
import { initialiseState, unsubscribe, subscribe } from 'base/api/service-worker/';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  FORM_RESET,
  PUSH_ENABLE,
  PUSH_DISABLE,
} from 'base/constants';

export function initPushState() {
  return (dispatch) => {
    initialiseState().then((subscription) => {
      dispatch({
        type: subscription ? PUSH_ENABLE : PUSH_DISABLE,
        subscription: subscription,
      });
    });
  };
}

export function togglePush(pushEnabled) {
  return (dispatch) => {
    if (pushEnabled) {
      return unsubscribe().then((subscription) => {
        dispatch({
          type: PUSH_DISABLE,
          subscription: subscription,
        });
      });
    }
    return subscribe().then((subscription) => {
      dispatch({
        type: PUSH_ENABLE,
        subscription: subscription,
      });
    });
  };
}

export function loginUser() {
  return (dispatch, getState) => {
    const user = {
      username: getState().form.login.username.value,
      password: getState().form.login.password.value,
    };

    return dispatch({
      types: [
        LOGIN_USER_PENDING,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_ERROR,
      ],
      payload: {
        promise: login(user)
          .then((res) => {
            dispatch({
              type: FORM_RESET,
              form: 'login',
            });

            return res;
          }),
      },
    });
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
