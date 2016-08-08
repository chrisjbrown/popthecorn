import { ORDER_REQUEST } from 'base/constants';

export function requestOrder(orderId) {
  return {
    type: ORDER_REQUEST,
    payload: {
      orderId: orderId,
    },
  };
}
