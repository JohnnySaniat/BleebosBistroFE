/* eslint-disable prefer-promise-reject-errors */
const dbUrl = 'https://localhost:7166';

const getAllOrders = () => fetch(`${dbUrl}/orders`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => data.map((order) => ({
    ...order,
    items: order.items.map(({ id, name, price }) => ({ id, name, price })),
  })))
  .catch((error) => {
    console.error('Error fetching orders:', error);
    throw error;
  });

const deleteOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        resolve();
      } else {
        reject(`Failed to delete order with ID ${orderId}`);
      }
    })
    .catch(reject);
});

const addItemToOrder = (orderItemDto) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/add-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderItemDto),
  })
    .then((res) => {
      if (res.ok) {
        resolve();
      } else {
        reject('Failed to add item to order');
      }
    })
    .catch(reject);
});

const removeItemFromOrder = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${orderId}/items/${itemId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve(response.json());
    })
    .catch(reject);
});

const createOrder = (newOrder) => fetch(`${dbUrl}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newOrder),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create order.');
    }
    return response.json();
  })
  .then((data) => {
    console.log('New order created:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error creating order:', error);
    throw error;
  });

const getOrderItems = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const updateOrder = (id, paymentType, tip) => {
  const url = `${dbUrl}/order/checkout/${id}?paymentType=${paymentType}&tip=${tip}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update order details');
      }
      return response.json();
    });
};

export {
  getAllOrders,
  deleteOrder,
  addItemToOrder,
  removeItemFromOrder,
  createOrder,
  getOrderItems,
  getSingleOrder,
  updateOrder,
};
