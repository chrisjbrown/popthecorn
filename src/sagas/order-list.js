import { take, put, call } from 'redux-saga/effects';
import { getOrderList } from 'app/api/order-list/';

import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ERROR,
} from 'app/actions';

export function* watchOrderList() {
  while (true) {
    yield take(ORDER_LIST_REQUEST);
    yield call(orderList);
  }
}

export function* orderList() {
  try {
    const foundOrderList = yield call(getOrderList);
    yield put({
      type: ORDER_LIST_SUCCESS,
      payload: foundOrderList,
    });
    return foundOrderList;
  } catch (error) {
    yield put({
      type: ORDER_LIST_ERROR,
      error,
    });
    return error;
  }
}
