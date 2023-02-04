import { Order } from '@guitar-shop/core';
import { OrderCard } from '../order-card/order-card';

export interface OrdersListProps {
  orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps): JSX.Element {
  return (
    <ul className="orders__list" >
      {
        orders.map((order) => <OrderCard key={ order.id } order={ order } />)
      }
    </ul>
  );
}

