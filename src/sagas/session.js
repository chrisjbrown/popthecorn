import { take, put, fork, call, race } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { startSubmit, stopSubmit } from 'redux-form';

import { authAPI } from 'app/api/auth/';
import { initialiseState, unsubscribe, subscribe } from 'app/api/service-worker/';
import { loginRequest, loginSuccess, loginError, resetForm } from 'app/actions';

import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_SUBMIT,
  PUSH_SUBSCRIPTION,
  PUSH_TOGGLE,
  PUSH_ENABLE,
  PUSH_DISABLE,
} from 'app/actions';

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

function* handleLoginSubmit() {
  while (true) {
    // wait for a login submit
    const { payload } = yield take(LOGIN_SUBMIT);

    // start submitting the form
    yield put(startSubmit('login'));

    // put a login request
    yield put(loginRequest(payload.user.values));

    // wait for a response
    const { error, success } = yield race({
      success: take(LOGIN_SUCCESS),
      error: take(LOGIN_ERROR),
    });

    // if not an error, pop the screen
    if (!error) {
      // finalize the form

      payload.user.resolve();
      yield put(stopSubmit('login', { _error: '' }));

      yield put(resetForm('login'));

      yield put(loginSuccess(success.payload.user));
    } else {
      // finalize the form
      console.log(error.payload.error);
      payload.user.reject(error.payload.error);
      yield put(stopSubmit('login', { _error: error.payload.error }));
    }
  }
}

function* handleLoginRequest() {
  while (true) {
    try {
      // wait for a login request
      const { payload } = yield take(LOGIN_REQUEST);

      // call the api
      const user = yield call(authAPI, payload.user);

      // call the success
      yield put(loginSuccess(user));
    } catch (error) {
      // call the error
      yield put(loginError(error.message));
    }
  }
}

export function* initAuthSagas() {
  yield fork(handleLoginRequest);
  yield fork(handleLoginSubmit);
}
