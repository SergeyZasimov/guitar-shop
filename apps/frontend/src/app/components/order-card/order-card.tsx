import { Order, formatPrice } from '@guitar-shop/core';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store.hooks';
import { deleteOrder } from '../../store/features/orders/api-actions';
import { AppRoute, formatOrderId, formateAdminDate } from '../../utils';

export interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    dispatch(deleteOrder(order.id as string));
  };

  return (
    <li
      className="orders__item"
      onClick={ () => navigate(`${AppRoute.Orders}/${order.id}`) }
    >

      <h3 className="orders__number">Заказ № { formatOrderId(order.id as string) }</h3>

      <span className="orders__items">
        товаров&nbsp;
        <b className="orders__items-qty">{ order.orderSummary?.totalQuantity }</b>
      </span>

      <span className="orders__date">
        { formateAdminDate(order.createdAt) }
      </span>

      <b className="orders__sum">
        { formatPrice(order.orderSummary?.totalCost) }
        <span className="orders__rouble"> ₽</span>
      </b>

      <button
        className="button button--small orders__remove-button"
        type="button"
        onClick={ (evt: MouseEvent) => handleDeleteClick(evt) }
      >
        Удалить
      </button>

    </li>
  );
}

