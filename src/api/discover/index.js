import { get } from 'app/api/server';

const API_KEY = __API_KEY__;
const DISCOVER_ERR_MSG = 'Error discovering for items';

function toQueryString(obj = {}, urlEncode) {
  function flattenObj(x, path = []) {
    const result = [];

    Object.keys(x).forEach((key) => {
      if (!x.hasOwnProperty(key)) return;

      const newPath = path.slice();
      newPath.push(key);

      let vals = [];
      if (typeof x[key] === 'object') {
        vals = flattenObj(x[key], newPath);
      } else {
        vals.push({ path: newPath, val: x[key] });
      }
      vals.forEach((prop) => {
        return result.push(prop);
      });
    });

    return result;
  }

  let parts = flattenObj(obj);

  parts = parts.map((varInfo) => {
    if (varInfo.path.length === 1) {
      varInfo.path = varInfo.path[0];
    } else {
      const first = varInfo.path[0];
      const rest = varInfo.path.slice(1);
      varInfo.path = first + '[' + rest.join('][') + ']';
    }
    return varInfo;
  });

  const queryString = parts.map((varInfo) => {
    return varInfo.path + '=' + varInfo.val;
  }).join('&');
  if (urlEncode) {
    return encodeURIComponent(queryString);
  }
  return queryString;
}

export function discoverMovie(criteria) {
  return new Promise((resolve, reject) => {
    return get('discover/movie?api_key=' + API_KEY + '&' + toQueryString(criteria, false))
      .then((json) => {
        if (json.error) {
          return reject(new Error(json.error.reason));
        }
        return resolve(json);
      })
      .then(null, () => reject(new Error(DISCOVER_ERR_MSG)));
  });
}
