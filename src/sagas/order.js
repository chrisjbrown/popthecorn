import { take, put, call } from 'redux-saga/effects';
import { getOrder } from 'app/api/order/';

import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
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
