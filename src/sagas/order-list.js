import { take, put, call } from 'redux-saga/effects';
import { getOrderList } from 'app/api/order-list/';
import {
  orderAssignedListSuccess,
  orderAssignedListError,
  orderUnassignedListSuccess,
  orderUnassignedListError,

} from 'app/actions/order-list/';

import {
  ORDER_ASSIGNED_LIST_REQUEST,
  ORDER_UNASSIGNED_LIST_REQUEST,
} from 'app/actions';

export function* watchOrderAssignedList() {
  while (true) {
    yield take(ORDER_ASSIGNED_LIST_REQUEST);
    yield call(orderAssignedList);
  }
}

function* orderAssignedList() {
  try {
    const foundOrderList = yield call(getOrderList, 'assigned');
    yield put(orderAssignedListSuccess(foundOrderList.data));
    return foundOrderList;
  } catch (error) {
    yield put(orderAssignedListError(error));
    return error;
  }
}

export function* watchOrderUnassignedList() {
  while (true) {
    yield take(ORDER_UNASSIGNED_LIST_REQUEST);
    yield call(orderUnassignedList);
  }
}

function* orderUnassignedList() {
  try {
    const foundOrderList = yield call(getOrderList);
    yield put(orderUnassignedListSuccess(foundOrderList.data));
    return foundOrderList;
  } catch (error) {
    yield put(orderUnassignedListError(error));
    return error;
  }
}
