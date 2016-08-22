export const ORDER_LIST_REQUEST = 'App/ORDER_LIST_REQUEST';
export function orderListRequest() {
  return {
    type: ORDER_LIST_REQUEST,
  };
}

export const ORDER_LIST_SUCCESS = 'App/ORDER_LIST_SUCCESS';
export function orderListSuccess(orders) {
  return {
    type: ORDER_LIST_SUCCESS,
    payload: {
      orders: orders,
    },
  };
}

export const ORDER_LIST_ERROR = 'App/ORDER_LIST_ERROR';
export function orderListError(error) {
  return {
    type: ORDER_LIST_ERROR,
    payload: {
      error: error,
    },
  };
}
