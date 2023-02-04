import { Order, formatPrice } from '@guitar-shop/core';
import { formateAdminDate } from '../../utils';

export interface OrderCardProps {
  order: Order;
}

export const DEFAULT_ORDER_FORMAT_ID_LENGTH = 10;

export const formatOrderId = (id: string) => {
  return id.slice(id.length - DEFAULT_ORDER_FORMAT_ID_LENGTH);
};

export function OrderCard({ order }: OrderCardProps): JSX.Element {
  return (
    <li className="orders__item">
      <h3 className="orders__number">Заказ №{ formatOrderId(order.id as string) }</h3>
      <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">{ order.orderList.length }</b></span>
      <span className="orders__date">{ formateAdminDate(order.createdAt) }</span>
      <b className="orders__sum">{ formatPrice(order.orderSummary?.totalCost) }<span className="orders__rouble">₽</span></b>
      <button className="button button--small orders__remove-button" type="button">Удалить</button>
    </li>
  );
}

