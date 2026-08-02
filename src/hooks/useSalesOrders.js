import { useEffect, useState } from 'react';
import { getSalesOrders, subscribeSalesOrders } from '../lib/salesOrders';

export default function useSalesOrders() {
  const [orders, setOrders] = useState(() => getSalesOrders());

  useEffect(() => {
    return subscribeSalesOrders(() => setOrders([...getSalesOrders()]));
  }, []);

  return orders;
}
