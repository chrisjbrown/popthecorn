import { take, put, call } from 'redux-saga/effects';
import { getOrder, completeOrder } from 'app/api/order/';

import {
  orderError,
  orderSuccess,
  orderCompleteSuccess,
  orderCompleteError,
} from 'app/actions/order';

import {
  ORDER_REQUEST,
  ORDER_COMPLETE_REQUEST,
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

export function* watchOrderComplete() {
  while (true) {
    const requestAction = yield take(ORDER_COMPLETE_REQUEST);
    yield call(orderComplete, requestAction.payload.orderId);
  }
}

export function* orderComplete(orderId) {
  try {
    const status = yield call(completeOrder, orderId);
    yield put(orderCompleteSuccess(status));
    return status;
  } catch (error) {
    yield put(orderCompleteError(error));
    return error;
  }
}
