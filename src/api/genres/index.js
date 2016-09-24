import { get } from 'app/api/server';

const API_KEY = __API_KEY__;
const GENRES_ERR_MSG = 'Error discovering for items';

export function getGenres() {
  return new Promise((resolve, reject) => {
    return get('genre/movie/list?api_key=' + API_KEY)
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(GENRES_ERR_MSG)));
  });
}
