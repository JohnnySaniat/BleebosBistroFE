/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { removeItemFromOrder } from '../../api/orderData';

function BushelItemCard({ itemObj, orderId, onUpdate }) {
  const removeThisItem = () => {
    if (window.confirm(`Remove ${itemObj.name} from the order?`)) {
      removeItemFromOrder(orderId, itemObj.id)
        .then(() => {
          onUpdate();
        })
        .catch((error) => {
          console.error('Error removing product from order:', error);
        });
    }
  };
  return (

    <Card className="complete-item-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={itemObj.image} alt={itemObj.name} className="item-card-image" />
      <Card.Body className="item-card-body">
        <Card.Title className="card-title">{itemObj.name}</Card.Title>
        <Card.Text>{itemObj.itemType}</Card.Text>
        <Card.Text className="card-description">{itemObj.description}</Card.Text>
        <Button className="bushel-card-button" variant="danger" onClick={removeThisItem}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

BushelItemCard.propTypes = {
  itemObj: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    itemType: PropTypes.string,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BushelItemCard;
