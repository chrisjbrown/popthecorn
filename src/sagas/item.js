import { take, put, call } from 'redux-saga/effects';
import { getItem, reserveItem } from 'app/api/item/';
import {
  ITEM_REQUEST,
  ITEM_RESERVE_REQUEST,
  itemReserveSuccess,
  itemReserveError,
  itemSuccess,
  itemError,
  orderRequest,
} from 'app/actions/';

export function* watchItem() {
  while (true) {
    const { payload: { orderId, itemId } } = yield take(ITEM_REQUEST);
    yield call(item, orderId, itemId);
  }
}

export function* item(orderId, itemId) {
  try {
    const foundItem = yield call(getItem, orderId, itemId);
    yield put(itemSuccess(foundItem.data));
    return foundItem;
  } catch (error) {
    yield put(itemError(error));
    return error;
  }
}

export function* watchItemReserve() {
  while (true) {
    const { payload: { orderId, itemId, itemIndex } } = yield take(ITEM_RESERVE_REQUEST);
    yield call(itemReserve, orderId, itemId, itemIndex);
  }
}

export function* itemReserve(orderId, itemId, itemIndex) {
  try {
    const status = yield call(reserveItem, orderId, itemId, itemIndex);
    yield put(itemReserveSuccess(itemId, itemIndex));
    if (status.data === 'UPDATE') {
      yield put(orderRequest(orderId));
    }
    return status;
  } catch (error) {
    yield put(itemReserveError(error, itemIndex));
    return error;
  }
}
