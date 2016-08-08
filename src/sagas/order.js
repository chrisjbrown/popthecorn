import { take, put, call } from 'redux-saga/effects';
import { getOrder } from 'base/api/order/';

import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
} from 'base/constants';

export function* watchOrder() {
  while (true) {
    const orderId = yield take(ORDER_REQUEST);
    yield call(order, orderId);
  }
}

export function* order(orderId) {
  try {
    const foundOrder = yield call(getOrder, orderId);
    yield put({
      type: ORDER_SUCCESS,
      payload: foundOrder,
    });
    return foundOrder;
  } catch (error) {
    yield put({
      type: ORDER_ERROR,
      error,
    });
    return error;
  }
}
