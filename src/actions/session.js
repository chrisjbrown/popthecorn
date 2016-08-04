import {
  LOGIN_REQUEST,
  LOGOUT,
  PUSH_SUBSCRIPTION,
  PUSH_TOGGLE,
} from 'base/constants';

export function initPushState() {
  return {
    type: PUSH_SUBSCRIPTION,
  };
}

export function togglePush(pushEnabled) {
  return {
    type: PUSH_TOGGLE,
    payload: {
      pushEnabled: pushEnabled,
    },
  };
}

export function loginUser() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}
