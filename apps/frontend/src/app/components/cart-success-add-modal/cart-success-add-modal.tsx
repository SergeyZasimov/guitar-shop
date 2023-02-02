import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalClass } from '../../app.constant';
import { ModalProps } from '../../types';
import { AppRoute } from '../../utils';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export interface CartSuccessAddModalProps extends ModalProps { }

export function CartSuccessAddModal(props: PropsWithChildren<CartSuccessAddModalProps>) {
  const navigate = useNavigate();

  const handleToCatalogButtonClick = () => {
    props.onClickCloseModal();
    navigate(AppRoute.Root);
  };

  const handleToCartButtonClick = () => {
    props.onClickCloseModal();
    navigate(AppRoute.Cart);
  };

  return (
    <ModalOverlay modalClassName={ ModalClass.SuccessAdd } { ...props }>
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Товар успешно добавлен в корзину</p>
        <div className="modal__button-container modal__button-container--add">
          <button
            className="button button--small modal__button"
            onClick={ handleToCartButtonClick }
          >
            Перейти в корзину
          </button>
          <button
            className="button button--black-border button--small modal__button modal__button--right"
            onClick={ handleToCatalogButtonClick }
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
  );
}
