import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../api/orderData';
import OrderForm from '../../../components/forms/OrderForm';

function AddOrderToCurrentSales() {
  const [addOrder, setAddOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setAddOrder);
  }, [id]);

  return (<OrderForm obj={addOrder} />);
}

export default AddOrderToCurrentSales;
