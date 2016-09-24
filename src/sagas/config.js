import { put, call, take } from 'redux-saga/effects';
import { getConfig } from 'app/api/config/';
import { configSuccess, configError } from 'app/actions/config/';

import {
  CONFIG_REQUEST,
} from 'app/actions/config';

export function* watchConfig() {
  while (true) {
    yield take(CONFIG_REQUEST);
    yield call(runGetConfig);
  }
}

function* runGetConfig() {
  try {
    const foundConfig = yield call(getConfig);

    yield put(configSuccess(foundConfig));
    return foundConfig;
  } catch (error) {
    yield put(configError(error));
    return error;
  }
}
