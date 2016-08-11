import Orders from 'app/mockdata/order';

export function getOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundOrder = Orders.items.filter(
        (order) => {
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
