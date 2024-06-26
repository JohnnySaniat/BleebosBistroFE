/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ItemCard({ itemObj }) {
  return (

    <Card className="complete-item-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={itemObj.image} alt={itemObj.name} className="item-card-image" />
      <Card.Body className="item-card-body">
        <Card.Title className="card-title">{itemObj.name}</Card.Title>
        <Card.Text>{itemObj.itemType}</Card.Text>
        <Card.Text className="card-description">{itemObj.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    itemType: PropTypes.string,
  }).isRequired,
};

export default ItemCard;
