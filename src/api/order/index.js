import Orders from 'base/mockdata/order';

export function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundOrder = Orders.items.filter(
        (order) => {
          console.log(order.order.id);
          console.log(orderId);
          return order.order.id === orderId;
        });
      if (foundOrder.length > 0) {
        resolve({ orderData: foundOrder[0] });
      } else {
        reject({ message: 'Order not found' });
      }
    }, 2000);
  });
}
