import Users from 'base/mockdata/users';

export function login(credentials) {
  return new Promise((resolve, reject) => {
    if (credentials.username && credentials.password) {
      const authorized = Users.filter(
        (userFound) => {
          return (userFound.Username === credentials.username) && (userFound.Password === credentials.password);
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
