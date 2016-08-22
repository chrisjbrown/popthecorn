import { take, put, call } from 'redux-saga/effects';
import { getOrderList } from 'app/api/order-list/';
import { orderListSuccess, orderListError } from 'app/actions/order-list/';

import {
  ORDER_LIST_REQUEST,
} from 'app/actions';

export function* watchOrderList() {
  while (true) {
    yield take(ORDER_LIST_REQUEST);
    yield call(orderList);
  }
}

function* orderList() {
  try {
    const foundOrderList = yield call(getOrderList);
    yield put(orderListSuccess(foundOrderList));
    return foundOrderList;
  } catch (error) {
    yield put(orderListError(error));
    return error;
  }
}
