export const BASE_URL = (__DEV__ ? '' : __API__) + '/dropshipper';

import 'whatwg-fetch';

export function post(path, data) {
  return fetch(BASE_URL + path, {
    method: 'post',
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json());
}

export function get(path, data) {
  return fetch(BASE_URL + path, {
    method: 'get',
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Access-Control-Request-Headers': 'X-Request-ID',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json());
}
