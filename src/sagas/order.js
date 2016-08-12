import { take, put, call } from 'redux-saga/effects';
import { getOrder } from 'app/api/order/';
import { orderError, orderSuccess } from 'app/actions/order';

import {
  ORDER_REQUEST,
} from 'app/actions';

export function* watchOrder() {
  while (true) {
    const requestAction = yield take(ORDER_REQUEST);
    yield call(order, requestAction.payload.orderId);
  }
}

export function* order(orderId) {
  try {
    const foundOrder = yield call(getOrder, orderId);
    yield put(orderSuccess(foundOrder));
    return foundOrder;
  } catch (error) {
    yield put(orderError(error));
    return error;
  }
}
