import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import BushelItemCard from '../../components/cards/BushelItemCard';
import { getOrderItems, addItemToOrder } from '../../api/orderData';
import { getAllItems } from '../../api/itemData';

export default function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [availableItems, setAvailableItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setOrderId(router.query.id);
      getOrderItems(router.query.id).then(setOrderDetails);
    }
  }, [router.query.id]);

  const fetchAllItems = () => {
    getAllItems().then(setAvailableItems);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const handleAddItemToOrder = (itemId) => {
    const orderItemDto = {
      orderId,
      itemId,
    };

    addItemToOrder(orderItemDto)
      .then(() => {
        getOrderItems(orderId).then(setOrderDetails);
      })
      .catch((error) => {
        console.error('Failed to add item to order:', error);
      });
  };

  return (
    <>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {orderDetails.items?.map((item) => (
            <BushelItemCard key={item.id} itemObj={item} orderId={orderId} onUpdate={() => getOrderItems(orderId).then(setOrderDetails)} />
          ))}
        </div>
      </div>

      <div className="text-center my-4">
        <h2>Available Items</h2>
        <div className="d-flex flex-wrap">
          {availableItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <Button onClick={() => handleAddItemToOrder(item.id)}>Add to Order</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
