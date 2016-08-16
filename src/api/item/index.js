import { patch } from 'app/api/server';

const ITEM_ERR_MSG = 'Error updating order';

export function reserveItem(itemId) {
  return new Promise((resolve, reject) => {
    return patch('/items/' + itemId, { status: 'RESERVED' })
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ITEM_ERR_MSG)));
  });
}
