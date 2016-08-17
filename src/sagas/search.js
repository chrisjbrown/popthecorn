import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { searchItems } from 'app/api/search/';
import { searchItemSuccess, searchItemError } from 'app/actions/search/';

import {
  SEARCH_ITEM_REQUEST,
} from 'app/actions/search';

export function* watchSearchItems() {
  while (true) {
    yield takeLatest(SEARCH_ITEM_REQUEST, runSearchItems);
  }
}

function* runSearchItems(action) {
  try {
    const foundItemList = yield call(searchItems, action.payload.criteria);
    yield put(searchItemSuccess(foundItemList));
    return foundItemList;
  } catch (error) {
    yield put(searchItemError(error));
    return error;
  }
}
