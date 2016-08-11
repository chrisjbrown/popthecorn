export const ORDER_REQUEST = 'App/ORDER_REQUEST';
export const ORDER_SUCCESS = 'App/ORDER_SUCCESS';
export const ORDER_ERROR = 'App/ORDER_ERROR';
export function requestOrder(orderId) {
  return {
    type: ORDER_REQUEST,
    payload: {
      orderId: orderId,
    },
  };
}
