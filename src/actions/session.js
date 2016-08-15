// Triggered on login
export const PUSH_SUBSCRIPTION = 'App/PUSH_SUBSCRIPTION';
export function initPushState() {
  return {
    type: PUSH_SUBSCRIPTION,
  };
}

export const PUSH_TOGGLE = 'App/PUSH_TOGGLE';
export const PUSH_ENABLE = 'App/PUSH_ENABLE';
export const PUSH_DISABLE = 'App/PUSH_DISABLE';
export function togglePush(pushEnabled) {
  return {
    type: PUSH_TOGGLE,
    payload: {
      pushEnabled: pushEnabled,
    },
  };
}

// Triggered whenever the user clicks the login submit button
export const LOGIN_SUBMIT = 'App/LOGIN_SUBMIT';
export function loginSubmit(user) {
  return {
    type: LOGIN_SUBMIT,
    payload: {
      user: user,
    },
  };
}

// Triggered whenever a login request is dispatched from whenever point in the code
export const LOGIN_REQUEST = 'App/LOGIN_REQUEST';
export function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      user: user,
    },
  };
}

// triggered when the login has succeded
export const LOGIN_SUCCESS = 'App/LOGIN_SUCCESS';
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user: user,
    },
  };
}

// triggered when the login failed
export const LOGIN_ERROR = 'App/LOGIN_ERROR';
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: {
      error: error,
    },
  };
}

export const LOGOUT = 'App/LOGOUT';
export function logoutUser() {
  return {
    type: LOGOUT,
  };
}
