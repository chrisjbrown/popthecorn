import { takeLatest } from 'redux-saga';
import { put, call, race, take } from 'redux-saga/effects';
import { searchItems } from 'app/api/search/';
import { searchItemSuccess, searchItemError } from 'app/actions/search/';

import {
  SEARCH_ITEM_REQUEST,
  SEARCH_ITEM_RESET,
} from 'app/actions/search';

/**
 * [watchSearchItems: wait for search]
 */
export function* watchSearchItems() {
  while (true) {
    yield takeLatest(SEARCH_ITEM_REQUEST, runSearchItems);
  }
}

/**
 * [runSearchItems: run search, but cancel if form resets]
 * @param  {object} action [action object from app/actions/*]
 * @return {object}        [action object]
 */
function* runSearchItems(action) {
  try {
    // race success against reset
    const { success, reset } = yield race({
      success: call(searchItems, action.payload.criteria),
      reset: take(SEARCH_ITEM_RESET),
    });

    // search succeeded
    if (!reset) {
      yield put(searchItemSuccess(success));
      return success;
    }

    // user removed search criteria before it succeeded
    return reset;
  } catch (error) {
    yield put(searchItemError(error));
    return error;
  }
}
