import { put, call, take } from 'redux-saga/effects';
import { getGenres } from 'app/api/genres/';
import { genresSuccess, genresError } from 'app/actions/genres/';

import {
  GENRES_REQUEST,
} from 'app/actions/genres';

export function* watchGetGenres() {
  while (true) {
    yield take(GENRES_REQUEST);
    yield call(runGetGenres);
  }
}

function* runGetGenres() {
  try {
    const foundGenres = yield call(getGenres);
    yield put(genresSuccess(foundGenres.genres));
    return foundGenres;
  } catch (error) {
    yield put(genresError(error.message));
    return error;
  }
}
