export const ORDER_REQUEST = 'App/ORDER_REQUEST';
export function requestOrder(orderId) {
  return {
    type: ORDER_REQUEST,
    payload: {
      orderId: orderId,
    },
  };
}

export const ORDER_SUCCESS = 'App/ORDER_SUCCESS';
export function orderSuccess(order) {
  return {
    type: ORDER_SUCCESS,
    payload: {
      order: order,
    },
  };
}

export const ORDER_ERROR = 'App/ORDER_ERROR';
export function orderError(error) {
  return {
    type: ORDER_ERROR,
    payload: {
      error: error,
    },
  };
}

export const ORDER_COMPLETE_REQUEST = 'App/ORDER_COMPLETE_REQUEST';
export function requestCompleteOrder(orderId) {
  return {
    type: ORDER_COMPLETE_REQUEST,
    payload: {
      orderId: orderId,
    },
  };
}

export const ORDER_COMPLETE_SUCCESS = 'App/ORDER_COMPLETE_SUCCESS';
export function orderCompleteSuccess(status) {
  return {
    type: ORDER_COMPLETE_SUCCESS,
    payload: {
      status: status,
    },
  };
}

export const ORDER_COMPLETE_ERROR = 'App/ORDER_COMPLETE_ERROR';
export function orderCompleteError(error) {
  return {
    type: ORDER_COMPLETE_ERROR,
    payload: {
      error: error,
    },
  };
}
