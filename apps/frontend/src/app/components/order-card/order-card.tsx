import { Order, formatPrice } from '@guitar-shop/core';
import dayjs from 'dayjs';

export interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps): JSX.Element {
  return (
    <li className="orders__item">
      <h3 className="orders__number">Заказ { order.id }</h3>
      <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">{ order.orderList.length }</b></span>
      <span className="orders__date">{ dayjs(order.createdAt).toString() }</span><b className="orders__sum">{ formatPrice(order.orderSummary?.totalCost) }<span className="orders__rouble">₽</span></b>
      <button className="button button--small orders__remove-button" type="button">Удалить</button>
    </li>
  );
}

