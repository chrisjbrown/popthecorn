import Order from 'base/mockdata/order';

export function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderId) {
        resolve(Order[0]);
      } else {
        reject({ message: 'INVALID REQUEST' });
      }
    }, 2000);
  });
}
