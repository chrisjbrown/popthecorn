import { get } from 'app/api/server';

const SEARCH_ITEM_ERR_MSG = 'Error searching for items';

export function searchItems(criteria) {
  return new Promise((resolve, reject) => {
    return get('/items?customer=' + (criteria.customer || ''))
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(SEARCH_ITEM_ERR_MSG)));
  });
}
