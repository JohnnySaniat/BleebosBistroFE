import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { updateOrder } from '../../api/orderData';

function CheckoutForm({ orderId, order }) {
  const [paymentType, setPaymentType] = useState(order.paymentType || '');
  const [tip, setTip] = useState(order.tip || '');
  const router = useRouter();

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleTipChange = (e) => {
    setTip(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(orderId, paymentType, tip);
      router.push('/revenue');
    } catch (error) {
      console.error('Failed to update order:', error);
      // Handle error here
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="paymentType">
        <Form.Label>Payment Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter payment type"
          value={paymentType}
          onChange={handlePaymentTypeChange}
        />
      </Form.Group>

      <Form.Group controlId="tip">
        <Form.Label>Tip</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter tip amount"
          value={tip}
          onChange={handleTipChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Order
      </Button>
    </Form>
  );
}

CheckoutForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  order: PropTypes.shape({
    paymentType: PropTypes.string,
    tip: PropTypes.number,
  }).isRequired,
};

export default CheckoutForm;
