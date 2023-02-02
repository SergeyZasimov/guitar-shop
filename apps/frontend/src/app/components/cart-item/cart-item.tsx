import { formatPrice } from '@guitar-shop/core';
import { EntityId } from '@reduxjs/toolkit';
import { ChangeEvent, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, GUITAR_TYPE_EXPRESSION } from '../../app.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { decrQuantity, getCartItem, incQuantity, updateQuantity } from '../../store/features/cart/cart-slice';

export interface CartItemProps {
  cartItemId: EntityId;
  onDeleteClick: (cartItemId: EntityId) => void;
}

export function CartItem({ cartItemId, onDeleteClick }: CartItemProps): JSX.Element {
  const cartItem = useAppSelector(state => getCartItem(state, cartItemId));

  if (!cartItem) {
    return <Navigate to={ AppRoute.Root } />;
  }

  const dispatch = useAppDispatch();

  const { product, quantity } = cartItem;

  const itemCost = formatPrice(product.price * quantity);

  const [ isQuantityFocus, setIsQuantityFocus ] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQuantityInput = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateQuantity({
      id: cartItemId,
      quantity: parseInt(evt.target.value)
    }));
  };

  const handleDecrQuantity = () => {
    if (quantity === 1) {
      onDeleteClick(cartItemId);
      return;
    }
    dispatch(decrQuantity(cartItemId));
  };

  const handleQuantityBlur = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setIsQuantityFocus(false);
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={ () => onDeleteClick(cartItemId) }
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={ product.photo }
          width="55"
          height="130"
          alt={ product.title }
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{ product.title }</p>
        <p className="product-info__info">Артикул: { product.article }</p>
        <p className="product-info__info">
          { GUITAR_TYPE_EXPRESSION[ product.guitarType ] }, { product.stringsNumber } струнная
        </p>
      </div>
      <div className="cart-item__price">{ formatPrice(product.price) } ₽</div>
      <div className="quantity cart-item__quantity">

        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={ () => handleDecrQuantity() }
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>

        <input
          className="quantity__input"
          type="number"
          placeholder={ !isQuantityFocus ? `${quantity}` : '' }
          id="1-count"
          name="1-count"
          max="99"
          ref={ inputRef }
          onFocus={ () => setIsQuantityFocus(true) }
          onBlur={ handleQuantityBlur }
          onChange={ handleQuantityInput }
        />

        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={ () => dispatch(incQuantity(cartItemId)) }
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>

      </div>
      <div className="cart-item__price-total">{ itemCost } ₽</div>
    </div>
  );
}

