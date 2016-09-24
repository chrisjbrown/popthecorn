import { get } from 'app/api/server';

const API_KEY = __API_KEY__;
const CONFIG_ERR_MSG = 'Error getting moviedb config';

export function getConfig() {
  return new Promise((resolve, reject) => {
    return get('configuration?api_key=' + API_KEY)
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(CONFIG_ERR_MSG)));
  });
}
