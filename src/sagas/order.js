import { take, put, call } from 'redux-saga/effects';
import { getOrder, updateOrder, assignOrder } from 'app/api/order/';

import {
  orderError,
  orderSuccess,
  orderAssignError,
  orderAssignSuccess,
  orderUpdateSuccess,
  orderUpdateError,
} from 'app/actions/order';

import {
  ORDER_UPDATE_REQUEST,
  ORDER_REQUEST,
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
    const assignResponse = yield call(assignOrder, orderId);
    yield put(orderAssignSuccess(assignResponse.data));
    return assignResponse;
  } catch (error) {
    yield put(orderAssignError(error));
    return error;
  }
}

export function* watchOrderUpdate() {
  while (true) {
    const requestAction = yield take(ORDER_UPDATE_REQUEST);
    yield call(orderUpdate, requestAction.payload.orderId, requestAction.payload.status);
  }
}

function* orderUpdate(orderId, status) {
  try {
    const response = yield call(updateOrder, orderId, status);
    yield put(orderUpdateSuccess(response));
    return response;
  } catch (error) {
    yield put(orderUpdateError(error));
    return error;
  }
}
