import { get } from 'app/api/server';

const ORDER_ERR_MSG = 'Error requesting order';

export function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    return get('/items')
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        const foundOrder = json.data.items.filter((order) => {
          return order.order.id === orderId;
        });

        if (foundOrder.length > 0) {
          return resolve(foundOrder[0]);
        }

        return reject(new Error('Order not found'));
      })
      .then(null, () => reject(new Error(ORDER_ERR_MSG)));
  });
}
