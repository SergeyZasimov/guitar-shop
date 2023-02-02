import { formatPrice } from '@guitar-shop/core';
import { EntityId } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import { GUITAR_TYPE_EXPRESSION, ModalClass } from '../../app.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { deleteCartItem, getCartItem } from '../../store/features/cart/cart-slice';
import { ModalProps } from '../../types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export interface CartDeleteModalProps extends ModalProps {
  cartItemId: EntityId;
}

export function CartDeleteModal(props: PropsWithChildren<CartDeleteModalProps>) {
  const { cartItemId, ...overlayProps } = props;

  const cartItem = useAppSelector(state => getCartItem(state, cartItemId));
  const dispatch = useAppDispatch();

  if (!cartItem) {
    return <></>;
  }
  const { product } = cartItem;

  return (
    <>
      <ModalOverlay modalClassName={ ModalClass.CartDelete } { ...overlayProps }>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info">
            <img className="modal__img" src={ product.photo } width="67" height="137" alt={ product.title } />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">{ product.title }</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: { product.article }</p>
              <p className="modal__product-params">
                { GUITAR_TYPE_EXPRESSION[ product.guitarType ] }, { product.stringsNumber } струнная
              </p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{ formatPrice(product.price) } ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={ () => dispatch(deleteCartItem(cartItemId)) }
            >
              Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={ props.onClickCloseModal }
            >
              Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={ props.onClickCloseModal }
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </ModalOverlay>
    </>
  );
}
