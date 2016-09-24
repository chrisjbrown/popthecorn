import { takeLatest } from 'redux-saga';
import { put, call, race, take } from 'redux-saga/effects';
import { discoverMovie } from 'app/api/discover/';
import { discoverMovieSuccess, discoverMovieError } from 'app/actions/discover/';

import {
  DISCOVER_MOVIE_REQUEST,
  DISCOVER_MOVIE_RESET,
} from 'app/actions';

/**
 * [watchDiscoverMovie: wait for discover]
 */
export function* watchDiscoverMovie() {
  while (true) {
    yield takeLatest(DISCOVER_MOVIE_REQUEST, runDiscoverMovie);
  }
}

/**
 * [runDiscoverMovie: run search, but cancel if form resets]
 * @param  {object} action [action object from app/actions/*]
 * @return {object}        [action object]
 */
function* runDiscoverMovie(action) {
  try {
    // race success against reset
    const { success, reset } = yield race({
      success: call(discoverMovie, action.payload.criteria),
      reset: take(DISCOVER_MOVIE_RESET),
    });

    // discover succeeded
    if (!reset) {
      yield put(discoverMovieSuccess(success));
      return success;
    }

    // user removed discover criteria before it succeeded
    return reset;
  } catch (error) {
    yield put(discoverMovieError(error));
    return error;
  }
}
