export const ORDER_ASSIGNED_LIST_REQUEST = 'App/ORDER_ASSIGNED_LIST_REQUEST';
export function orderAssignedListRequest() {
  return {
    type: ORDER_ASSIGNED_LIST_REQUEST,
  };
}

export const ORDER_UNASSIGNED_LIST_REQUEST = 'App/ORDER_UNASSIGNED_LIST_REQUEST';
export function orderUnassignedListRequest() {
  return {
    type: ORDER_UNASSIGNED_LIST_REQUEST,
  };
}

export const ORDER_ASSIGNED_LIST_SUCCESS = 'App/ORDER_ASSIGNED_LIST_SUCCESS';
export function orderAssignedListSuccess(data) {
  return {
    type: ORDER_ASSIGNED_LIST_SUCCESS,
    payload: {
      orders: data,
    },
  };
}

export const ORDER_UNASSIGNED_LIST_SUCCESS = 'App/ORDER_UNASSIGNED_LIST_SUCCESS';
export function orderUnassignedListSuccess(data) {
  return {
    type: ORDER_UNASSIGNED_LIST_SUCCESS,
    payload: {
      orders: data,
    },
  };
}

export const ORDER_ASSIGNED_LIST_ERROR = 'App/ORDER_ASSIGNED_LIST_ERROR';
export function orderAssignedListError(error) {
  return {
    type: ORDER_ASSIGNED_LIST_ERROR,
    payload: {
      error: error,
    },
  };
}

export const ORDER_UNASSIGNED_LIST_ERROR = 'App/ORDER_UNASSIGNED_LIST_ERROR';
export function orderUnassignedListError(error) {
  return {
    type: ORDER_UNASSIGNED_LIST_ERROR,
    payload: {
      error: error,
    },
  };
}
