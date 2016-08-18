/**
 * better way of handling setTimeout/setInterval
 * makes use of promises and promise structure
 * source: https://gist.github.com/joepie91/2664c85a744e6bd0629c
 */

export function delay(ms) {
  let res;
  let rej;

  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  p._timeout = setTimeout(() => {
    res();
  }, ms);
  p.cancel = (err) => {
    rej(err || new Error('Cancelled'));
    clearTimeout(p._timeout);
    return p;
  };
  return p;
}
