import { Product, formatPrice } from '@guitar-shop/core';
import { PropsWithChildren } from 'react';
import { GUITAR_TYPE_EXPRESSION, ModalClass } from '../../app.constant';
import { useAppDispatch } from '../../hooks/store.hooks';
import { addToCart } from '../../store/features/cart/cart-slice';
import { ModalProps } from '../../types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export interface CartAddModalProps extends ModalProps {
  product: Product | null;
  onSuccessAdd: () => void;
}

export function CartAddModal(props: PropsWithChildren<CartAddModalProps>): JSX.Element {

  const { product, onSuccessAdd, ...overlayProps } = props;

  if (!product) {
    return <></>;
  }

  const dispatch = useAppDispatch();

  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
    props.onClickCloseModal();
    onSuccessAdd();
  };

  return (
    <ModalOverlay modalClassName={ ModalClass.CartAdd } { ...overlayProps }>
      <div className="modal__content">
        <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
        <div className="modal__info">
          <img className="modal__img" src={ product.photo } width="67" height="137" alt="Честер bass" />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">{ product.title }</h3>
            <p className="modal__product-params modal__product-params--margin-11">Артикул: { product.article }</p>
            <p className="modal__product-params">{ GUITAR_TYPE_EXPRESSION[ product.guitarType ] }, { product.stringsNumber } струнная</p>
            <p className="modal__price-wrapper"><span className="modal__price">Цена:</span>
              <span className="modal__price"> { formatPrice(product.price) } ₽</span>
            </p>
          </div>
        </div>
        <div className="modal__button-container">
          <button
            className="button button--red button--big modal__button modal__button--add"
            onClick={ handleAddToCartClick }
          >
            Добавить в корзину
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
  );
}

