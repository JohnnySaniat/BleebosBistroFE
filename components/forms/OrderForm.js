import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../api/orderData';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  subtotal: null,
  paymentType: null,
  tip: null,
  total: null,
  date: null,
  image: 'https://i.postimg.cc/C12kh8Kj/Alien-25.png',
  items: [],
};

function OrderForm({ obj }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateOrder(formInput).then(() => window.location.reload());
      router.push('/items');
    } else {
      const payload = { ...formInput, userId: user.id };
      createOrder(payload).then(router.push('/orders'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} an Order</h2>

      <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          value={formInput.firstName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          value={formInput.lastName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="email" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button className="user-card-button" variant="danger" type="submit">
        {obj.id ? 'Update' : 'Create'} Order
      </Button>
    </Form>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    subtotal: PropTypes.number,
    paymentType: PropTypes.string,
    tip: PropTypes.number,
    total: PropTypes.number,
    date: PropTypes.string,
    image: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
