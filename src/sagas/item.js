import { take, put, call } from 'redux-saga/effects';
import { getItem, reserveItem } from 'app/api/item/';
import {
  ITEM_REQUEST,
  ITEM_RESERVE_REQUEST,
  itemReserveSuccess,
  itemReserveError,
  itemSuccess,
  itemError,
} from 'app/actions/item/';

export function* watchItem() {
  while (true) {
    const requestAction = yield take(ITEM_REQUEST);
    yield call(getItem, requestAction.payload.orderId, requestAction.payload.itemId);
  }
}

export function* item(orderId, itemId) {
  try {
    const status = yield call(getItem, orderId, itemId);
    yield put(itemSuccess(itemId));
    return status;
  } catch (error) {
    yield put(itemError(error));
    return error;
  }
}

export function* watchItemReserve() {
  while (true) {
    const requestAction = yield take(ITEM_RESERVE_REQUEST);
    yield call(itemReserve, requestAction.payload.orderId, requestAction.payload.itemId);
  }
}

export function* itemReserve(orderId, itemId) {
  try {
    const status = yield call(reserveItem, orderId, itemId);
    yield put(itemReserveSuccess(itemId));
    return status;
  } catch (error) {
    yield put(itemReserveError(error));
    return error;
  }
}
