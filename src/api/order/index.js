import { get } from 'app/api/server';
import { patch } from 'app/api/server';

const ORDER_ERR_MSG = 'Error requesting order';

export function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    return get('/pickingorders/' + orderId)
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ORDER_ERR_MSG)));
  });
}

export function assignOrder(orderId) {
  return new Promise((resolve, reject) => {
    return patch('/pickingorders/' + orderId, { assigned: true })
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ORDER_ERR_MSG)));
  });
}

export function updateOrder(orderId, status) {
  return new Promise((resolve, reject) => {
    return patch('/pickingorders/' + orderId, { status: status })
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ORDER_ERR_MSG)));
  });
}
