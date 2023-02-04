import { OrderItem, Product, formatPrice } from '@guitar-shop/core';
import { MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GUITAR_TYPE_EXPRESSION } from '../../app.constant';
import { Breadcrumbs } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { deleteOrder, deleteProductFromOrder, fetchOrder } from '../../store/features/orders/api-actions';
import { getOrder } from '../../store/features/orders/order-slice';
import { AppRoute, formatOrderId, formateAdminDate } from '../../utils';

export interface OrderPageProps { }

export function OrderPage(): JSX.Element {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const order = useAppSelector(getOrder);
  const navigate = useNavigate();

  const handleDeleteProductClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('button-cross')) {
      if (order?.orderList.length === 1) {
        dispatch(deleteOrder(order.id as string));
        navigate(AppRoute.Orders);
      } else {
        const productId = target.dataset.id;
        if (order?.id && productId) {
          dispatch(deleteProductFromOrder({ orderId: order.id, productId }));
        }
      }
    }
  };

  useEffect(() => {
    if (typeof orderId === 'string') {
      dispatch(fetchOrder(orderId));
    }
  }, [ orderId ]);

  if (!order) {
    return <></>;
  }

  return (
    <main className="page-content">
      <section className="order">
        <div className="container">
          <h1 className="order__title">
            Заказ № { formatOrderId(order.id as string) }
          </h1>
          <Breadcrumbs />
          <table className="order-table">
            <tbody>
              <tr>
                <td>Общее количество товаров</td>
                <td>{ order.orderSummary?.totalQuantity }</td>
              </tr>
              <tr>
                <td>Дата заказа</td>
                <td>{ formateAdminDate(order.createdAt) }</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>К оплате</td>
                <td>
                  { formatPrice(order.orderSummary?.totalCost) }
                  <span>₽</span>
                </td>
              </tr>
            </tfoot>
          </table>
          <ul className="order__list order-list" onClick={ (evt) => handleDeleteProductClick(evt) }>
            {
              order.orderList.map(({ product, quantity, cost }: OrderItem) => (
                <li
                  key={ (product as Product).id }
                  className="order-list__item"
                >
                  <div className="order-list__data">
                    <img
                      src={ (product as Product).photo }
                      width="60"
                      height="130"
                      alt={ (product as Product).title }
                    />
                    <div className="order-list__container">
                      <p className="order-list__name">{ (product as Product).title }</p>
                      <p className="order-list__lot">Артикул: SO757575</p>
                      <p className="order-list__parameters">
                        { GUITAR_TYPE_EXPRESSION[ (product as Product).guitarType ] },
                        { (product as Product).stringsNumber } струнная
                      </p>
                    </div>
                  </div>
                  <span className="order-list__quantity">{ quantity }</span>
                  <span className="order-list__price">{ formatPrice(cost) } ₽</span>
                  <button
                    className="order-list__button button-cross"
                    type="button"
                    aria-label="Закрыть"
                    data-id={ (product as Product).id }
                  >
                    <span className="button-cross__icon"></span>
                  </button>
                </li>
              )
              )
            }
          </ul>
          <button
            className="button order__button button--small button--black-border"
            onClick={ () => navigate(AppRoute.Orders) }
          >
            Вернуться к списку заказов
          </button>
        </div>
      </section>
    </main>
  );
}

