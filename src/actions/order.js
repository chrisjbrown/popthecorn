export const ORDER_REQUEST = 'App/ORDER_REQUEST';
export function orderRequest(orderId) {
  return {
    type: ORDER_REQUEST,
    payload: {
      orderId: orderId,
    },
  };
}

export const ORDER_SUCCESS = 'App/ORDER_SUCCESS';
export function orderSuccess(data) {
  return {
    type: ORDER_SUCCESS,
    payload: {
      items: data,
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

export const ORDER_UPDATE_REQUEST = 'App/ORDER_UPDATE_REQUEST';
export function orderUpdateRequest(orderId, status) {
  return {
    type: ORDER_UPDATE_REQUEST,
    payload: {
      orderId: orderId,
      status: status,
    },
  };
}

export const ORDER_UPDATE_SUCCESS = 'App/ORDER_UPDATE_SUCCESS';
export function orderUpdateSuccess(status) {
  return {
    type: ORDER_UPDATE_SUCCESS,
    payload: {
      status: status,
    },
  };
}

export const ORDER_UPDATE_ERROR = 'App/ORDER_UPDATE_ERROR';
export function orderUpdateError(error) {
  return {
    type: ORDER_UPDATE_ERROR,
    payload: {
      error: error,
    },
  };
}

export const ORDER_ASSIGN_REQUEST = 'App/ORDER_ASSIGN_REQUEST';
export function orderAssignRequest(orderId) {
  return {
    type: ORDER_ASSIGN_REQUEST,
    payload: {
      orderId: orderId,
    },
  };
}

export const ORDER_ASSIGN_SUCCESS = 'App/ORDER_ASSIGN_SUCCESS';
export function orderAssignSuccess(order) {
  return {
    type: ORDER_ASSIGN_SUCCESS,
    payload: {
      order: order,
    },
  };
}

export const ORDER_ASSIGN_ERROR = 'App/ORDER_ASSIGN_ERROR';
export function orderAssignError(error) {
  return {
    type: ORDER_ASSIGN_ERROR,
    payload: {
      error: error,
    },
  };
}
