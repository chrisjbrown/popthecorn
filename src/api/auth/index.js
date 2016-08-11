import { BASE_URL } from 'app/api/server';

const LOGIN_ERR_MSG = 'The username or password you have entered is invalid.';

export function authAPI(credentials) {
  return new Promise((resolve, reject) => {
    return fetch(BASE_URL + '/authenticate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'employeeId=' + credentials.employeeId + '&pin=' + credentials.pin,
    })
    .then(response => response.json())
    .then(json => {
      if (json.error) {
        return reject(new Error(json.error.reason));
      }
      return resolve(json);
    })
    .then(null, () => reject(new Error(LOGIN_ERR_MSG)));
  });
}
