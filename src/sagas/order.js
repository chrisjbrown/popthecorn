import { take, put, call } from 'redux-saga/effects';
import { getOrder, completeOrder, assignOrder } from 'app/api/order/';

import {
  orderError,
  orderSuccess,
  orderAssignError,
  orderAssignSuccess,
  orderCompleteSuccess,
  orderCompleteError,
} from 'app/actions/order';

import {
  ORDER_REQUEST,
  ORDER_COMPLETE_REQUEST,
  ORDER_ASSIGN_REQUEST,
} from 'app/actions';

export function* watchOrder() {
  while (true) {
    const requestAction = yield take(ORDER_REQUEST);
    yield call(order, requestAction.payload.orderId);
  }
}

function* order(orderId) {
  try {
    const foundOrder = yield call(getOrder, orderId);
    yield put(orderSuccess(foundOrder.data));
    return foundOrder;
  } catch (error) {
    yield put(orderError(error));
    return error;
  }
}

export function* watchOrderAssign() {
  while (true) {
    const requestAction = yield take(ORDER_ASSIGN_REQUEST);
    yield call(orderAssign, requestAction.payload.orderId);
  }
}

function* orderAssign(orderId) {
  try {
    const updatedOrder = yield call(assignOrder, orderId);
    yield put(orderAssignSuccess(updatedOrder.data));
    return updatedOrder;
  } catch (error) {
    yield put(orderAssignError(error));
    return error;
  }
}

export function* watchOrderComplete() {
  while (true) {
    const requestAction = yield take(ORDER_COMPLETE_REQUEST);
    yield call(orderComplete, requestAction.payload.orderId);
  }
}

function* orderComplete(orderId) {
  try {
    const status = yield call(completeOrder, orderId);
    yield put(orderCompleteSuccess(status));
    return status;
  } catch (error) {
    yield put(orderCompleteError(error));
    return error;
  }
}
