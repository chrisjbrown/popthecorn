import { take, put, call } from 'redux-saga/effects';
import { reserveItem } from 'app/api/item/';
import { itemReserveSuccess, itemReserveError } from 'app/actions/item/';
import { requestItemList } from 'app/actions/item-list/';

import {
  ITEM_RESERVE_REQUEST,
} from 'app/actions';

export function* watchItemReserve() {
  while (true) {
    const requestAction = yield take(ITEM_RESERVE_REQUEST);
    yield call(itemReserve, requestAction.payload.itemId);
  }
}

export function* itemReserve(itemId) {
  try {
    const status = yield call(reserveItem, itemId);
    yield put(itemReserveSuccess(status));
    yield put(requestItemList());
    return status;
  } catch (error) {
    yield put(itemReserveError(error));
    return error;
  }
}
