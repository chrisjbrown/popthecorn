import { get, patch } from 'app/api/server';

const ITEM_RESERVE_ERR_MSG = 'Error updating order';
const ITEM_ERR_MSG = 'Error getting item';

export function getItem(orderId, itemId) {
  return new Promise((resolve, reject) => {
    return get('/pickingorders/' + orderId + '/items/' + itemId)
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ITEM_ERR_MSG)));
  });
}

export function reserveItem(orderId, itemId) {
  return new Promise((resolve, reject) => {
    return patch('/pickingorders/' + orderId + ' /items/' + itemId, { status: 'RESERVED' })
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ITEM_RESERVE_ERR_MSG)));
  });
}
