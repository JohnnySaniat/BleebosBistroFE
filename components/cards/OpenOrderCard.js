/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteOrder } from '../../api/orderData';
import OrderForm from '../forms/OrderForm';

function OpenOrderCard({ orderObj, onUpdate }) {
  const [showCheckout, setShowCheckout] = useState(false);

  const deleteThisOrder = () => {
    if (window.confirm(`Do you want to delete ${orderObj.firstName} ${orderObj.lastName}?`)) {
      deleteOrder(orderObj.id).then(() => onUpdate());
    }
    window.location.reload();
  };

  return (
    <Card className="complete-order-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img className="order-card-image" variant="top" src={orderObj.image} alt={orderObj.lastName} />
      <Card.Body className="order-card-body">
        <Card.Title className="card-title">{orderObj.firstName} {orderObj.lastName}</Card.Title>
        <Card.Text>{orderObj.email}</Card.Text>
        <Card.Text className="card-description">Subtotal: {orderObj.calculateSubtotal}</Card.Text>
        <Link href={`/order/${orderObj.id}`} passHref>
          <Button className="checkout-card-button" variant="success">Details</Button>
        </Link>
        <Link href={`/order/checkout/${orderObj.id}`} passHref>
          <Button className="checkout-card-button" variant="warning">Checkout</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisOrder} className="checkout-card-button">Delete</Button>
        {showCheckout && (
          <OrderForm orderId={orderObj.id} onSubmit={() => setShowCheckout(false)} />
        )}
      </Card.Body>
    </Card>
  );
}

OpenOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.number,
    isClosed: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    paymentType: PropTypes.string,
    subtotal: PropTypes.number,
    tip: PropTypes.number,
    total: PropTypes.number,
    calculateSubtotal: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OpenOrderCard;
