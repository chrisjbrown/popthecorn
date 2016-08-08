import OrderList from 'base/mockdata/order-list';

export function getOrderList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(OrderList);
    }, 2000);
  });
}
