/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ClosedOrderCard({ orderObj }) {
  return (

    <Card className="complete-order-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img className="order-card-image" variant="top" src={orderObj.image} alt={orderObj.lastName} />
      <Card.Body className="order-card-body">
        <Card.Title className="card-title">{orderObj.firstName} {orderObj.lastName}</Card.Title>
        <Card.Text>{orderObj.email}</Card.Text>
        <Card.Text className="card-description">Subtotal: ${orderObj.calculateSubtotal}</Card.Text>
        <Card.Text className="card-description">Tip: ${orderObj.tip}</Card.Text>
        <Card.Text className="card-description">Total: ${orderObj.calculateTotalRevenue}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ClosedOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.number,
    isClosed: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    paymentType: PropTypes.string,
    subtotal: PropTypes.number,
    calculateTotalRevenue: PropTypes.number,
    tip: PropTypes.number,
    total: PropTypes.number,
    // date: PropTypes.instanceOf(Date),
    calculateSubtotal: PropTypes.number,
  }).isRequired,
};

export default ClosedOrderCard;
