export const BASE_URL = (__DEV__ ? '' : __API__) + '/dropshipper';

import 'whatwg-fetch';

export function post(path, data) {
  return fetch(BASE_URL + path, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json());
}
