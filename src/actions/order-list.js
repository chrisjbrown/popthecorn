export const ORDER_LIST_REQUEST = 'App/ORDER_LIST_REQUEST';
export const ORDER_LIST_SUCCESS = 'App/ORDER_LIST_SUCCESS';
export const ORDER_LIST_ERROR = 'App/ORDER_LIST_ERROR';

export function requestOrderList() {
  return {
    type: ORDER_LIST_REQUEST,
  };
}
