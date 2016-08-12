import { get } from 'app/api/server';

const ORDER_LIST_ERR_MSG = 'Error requesting order list';

export function getOrderList() {
  return new Promise((resolve, reject) => {
    return get('/pickingorder/item/list')
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(ORDER_LIST_ERR_MSG)));
  });
}
