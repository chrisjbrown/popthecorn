import { get } from 'app/api/server';

const API_KEY = __API_KEY__;
const DISCOVER_ERR_MSG = 'Error discovering for items';

export function discoverMovie(criteria) {
  return new Promise((resolve, reject) => {
    let criteriaString = '&';
    for (const prop in criteria) {
      criteriaString += prop + '=' + criteria[prop];
    }

    return get('discover/movie?api_key=' + API_KEY + criteriaString)
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(DISCOVER_ERR_MSG)));
  });
}
