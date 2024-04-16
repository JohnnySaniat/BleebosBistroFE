import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function UserCard({ userObj }) {
  return (
    <Card className="complete-user-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Body>
        <Card.Img variant="top" src={userObj.image} alt={userObj.uid} style={{ height: '350px' }} />
        <Card.Img variant="top" src="https://i.ibb.co/w4kK9w7/Bleebos-Bistro-Order2.png" alt="Additional Image" />
        <Card.Text className="card-text">Colleague: {userObj.username}</Card.Text>
        <Link href="/orders" passHref>
          <Button className="user-card-button" variant="success">Active Orders</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    username: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default UserCard;
