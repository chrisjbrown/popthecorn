// import { post } from '../server/';
import Users from 'base/mockdata/users';

// const LOGIN_ERR_MSG = `
//   The username or password you have entered is invalid.
// `;

export function login(user) {
  return authenticateUser(user.username, user.password, Users);
  // return post('/auth/login', user)
  // .then(json => resolve(json.meta))
  // .then(null, () => reject(new Error(LOGIN_ERR_MSG)));
  // });
}

function authenticateUser(username, password, users) {
  return new Promise((resolve, reject) => {
    if (username && password) {
      const authorized = users.filter(
        (user) => {
          return (user.Username === username) && (user.Password === password);
        });
      if (authorized.length > 0) {
        resolve({
          token: 'abcd1234',
          profile: {
            first: authorized[0].First,
            last: authorized[0].Last,
          },
          data: {
            msg: 'LOGIN SUCCESSFUL',
          },
        });
      } else {
        reject({ message: 'LOGIN FAILED' });
      }
    } else {
      reject({ message: 'INVALID REQUEST' });
    }
  });
}
