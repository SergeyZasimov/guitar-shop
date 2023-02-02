import { formatPrice } from '@guitar-shop/core';
import { EntityId } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Breadcrumbs, CartDeleteModal, CartItem, CartSuccessSendModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { sendOrder } from '../../store/features/cart/api-actions';
import { getCart, getCartItemsIds, getSendStatus, resetSendStatus } from '../../store/features/cart/cart-slice';
import { CartCommodity, LoadingStatus } from '../../types';

export function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cartItemsIds = useAppSelector(getCartItemsIds);
  const cart = useAppSelector(getCart);
  const sendStatus = useAppSelector(getSendStatus);

  const [ isCartDeleteModalShow, setIsCartDeleteModalShow ] = useState<boolean>(false);
  const [ isCartSuccessSendModalShow, setIsCartSuccessSendModalShow ] = useState<boolean>(false);
  const [ currentProduct, setCurrentProduct ] = useState<EntityId>('');

  const handleCartDeleteModalClose = () => {
    setIsCartDeleteModalShow(false);
  };

  const handleCartDeleteModalOpen = (cartItemId: EntityId) => {
    setCurrentProduct(cartItemId);
    setIsCartDeleteModalShow(true);
  };

  const calculateScore = (): number => {
    return cart.reduce((score, item) => {
      return score + (item.product.price * item.quantity);
    }, 0);
  };

  const handleSendOrder = () => {
    const customerOrder = cart.map((item: CartCommodity) => ({
      product: item.product.id as string,
      quantity: item.quantity
    }));
    dispatch(sendOrder({ orderList: customerOrder }));
  };

  useEffect(() => {
    if (sendStatus === LoadingStatus.Succeeded) {
      setIsCartSuccessSendModalShow(true);
      dispatch(resetSendStatus());
    }
  }, [ sendStatus ]);


  return (
    <>
      <CartDeleteModal
        cartItemId={ currentProduct }
        isOpen={ isCartDeleteModalShow }
        onClickCloseModal={ handleCartDeleteModalClose }
      />
      <CartSuccessSendModal
        isOpen={ isCartSuccessSendModalShow }
        onClickCloseModal={ () => setIsCartSuccessSendModalShow(false) }
      />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <Breadcrumbs />
          <div className="cart">
            {
              cartItemsIds.map(id =>
                <CartItem
                  key={ id }
                  cartItemId={ id }
                  onDeleteClick={ handleCartDeleteModalOpen }
                />)
            }
            <div className="cart__footer">
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{ formatPrice(calculateScore()) || 0 } ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">{ formatPrice(calculateScore()) || 0 } ₽</span>
                </p>
                <button
                  className="button button--red button--big cart__order-button"
                  onClick={ handleSendOrder }
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

