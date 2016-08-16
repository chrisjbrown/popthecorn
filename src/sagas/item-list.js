import { take, put, call } from 'redux-saga/effects';
import { getItemList } from 'app/api/item-list/';
import { itemListSuccess, itemListError } from 'app/actions/item-list/';

import {
  ITEM_LIST_REQUEST,
} from 'app/actions';

export function* watchItemList() {
  while (true) {
    yield take(ITEM_LIST_REQUEST);
    yield call(itemList);
  }
}

export function* itemList() {
  try {
    const foundItemList = yield call(getItemList);
    yield put(itemListSuccess(foundItemList));
    return foundItemList;
  } catch (error) {
    yield put(itemListError(error));
    return error;
  }
}
