export const BASE_URL = __API__;

import 'whatwg-fetch';

export function get(path, data) {
  return fetch(BASE_URL + path, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json());
}
