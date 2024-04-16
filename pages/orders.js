import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/orderData';
import OpenOrderCard from '../components/cards/OpenOrderCard';

function ShowOrders() {
  const [orders, setOrders] = useState([]);

  const getAllTheOrders = () => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    getAllTheOrders();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {orders
            .filter((order) => !order.isClosed)
            .map((order) => (
              <OpenOrderCard key={order.id} orderObj={order} onUpdate={getAllOrders} />
            ))}
        </div>
      </div>
    </>
  );
}

export default ShowOrders;
