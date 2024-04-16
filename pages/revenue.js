import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/orderData';
import ClosedOrderCard from '../components/cards/ClosedOrderCard';

function ShowRevenue() {
  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const getAllTheOrders = () => {
    getAllOrders()
      .then((data) => {
        const closedOrders = data.filter((order) => order.isClosed);
        const total = closedOrders.reduce((acc, order) => acc + (order.calculateTotalRevenue || 0), 0);
        setGrandTotal(total);
        setOrders(closedOrders);
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
        <div className="d-flex justify-content-center">
          <h2 className="total-revenue">Total Revenue: ${grandTotal}</h2>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {orders
          .filter((order) => order.isClosed)
          .map((order) => (
            <ClosedOrderCard key={order.id} orderObj={order} onUpdate={getAllOrders} />
          ))}
      </div>
    </>
  );
}

export default ShowRevenue;
