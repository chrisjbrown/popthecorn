import { take, put, fork, cancel, select, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { login } from 'base/api/auth/';
import { initialiseState, unsubscribe, subscribe } from 'base/api/service-worker/';

import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PUSH_SUBSCRIPTION,
  PUSH_TOGGLE,
  PUSH_ENABLE,
  PUSH_DISABLE,
  FORM_RESET,
} from 'base/constants';

export function* watchInit() {
  while (true) {
    yield take(PUSH_SUBSCRIPTION);
    yield call(initPushSubscription);
  }
}

export function* initPushSubscription() {
  try {
    const subscription = yield call(initialiseState);
    yield put({
      type: subscription ? PUSH_ENABLE : PUSH_DISABLE,
      subscription,
    });
    return subscription;
  } catch (error) {
    return error;
  }
}

export function* watchTogglePush() {
  while (true) {
    yield* takeLatest(PUSH_TOGGLE, togglePush);
  }
}

export function* togglePush(action) {
  try {
    if (action.payload.pushEnabled) {
      const success = yield call(unsubscribe);
      return yield put({ type: PUSH_DISABLE, success });
    }

    const subscription = yield call(subscribe);
    return yield put({ type: PUSH_ENABLE, subscription });
  } catch (error) {
    return error;
  }
}

export function* watchLogin() {
  while (true) {
    yield take(LOGIN_REQUEST);

    const getCredentials = (state) => {
      return {
        username: state.form.login.username.value,
        password: state.form.login.password.value,
      };
    };

    const credentials = yield select(getCredentials);

    // fork return a Task object
    const task = yield fork(authorize, credentials);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
    if (action.type === LOGOUT) {
      yield cancel(task);
    }

    yield put({ type: FORM_RESET, form: 'login' });
  }
}

export function* authorize(credentials) {
  try {
    const user = yield call(login, credentials);
    yield put({ type: LOGIN_SUCCESS, user });
    yield call(initPushSubscription);
    return user;
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
    return error;
  }
}
