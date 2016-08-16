import { get } from 'app/api/server';
import { patch } from 'app/api/server';

const ITEM_LIST_ERR_MSG = 'Error requesting order list';

export function getItemList() {
  return new Promise((resolve, reject) => {
    return get('/items')
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ITEM_LIST_ERR_MSG)));
  });
}

export function reserveItem(itemId) {
  return new Promise((resolve, reject) => {
    return patch('/items/' + itemId, { status: 'RESERVED' })
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ITEM_LIST_ERR_MSG)));
  });
}
