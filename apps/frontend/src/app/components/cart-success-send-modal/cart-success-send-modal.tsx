import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalClass } from '../../app.constant';
import { ModalProps } from '../../types';
import { AppRoute } from '../../utils';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export interface CartSuccessSendModalProps extends ModalProps { }

export function CartSuccessSendModal(props: PropsWithChildren<CartSuccessSendModalProps>) {
  const navigate = useNavigate();

  const handleToCatalogButtonClick = () => {
    props.onClickCloseModal();
    navigate(AppRoute.Root);
  };

  return (
    <ModalOverlay modalClassName={ ModalClass.SuccessSend } { ...props }>
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Спасибо за ваш заказ!</p>
        <div className="modal__button-container modal__button-container--send">
          <button
            className="button button--small modal__button modal__button--send"
            onClick={ handleToCatalogButtonClick }
          >
            К покупкам!
          </button>
        </div>
        <button
          className="modal__close-btn button-cross"
          type="button" aria-label="Закрыть"
          onClick={ props.onClickCloseModal }
        >
          <span className="button-cross__icon"></span>
          <span className="modal__close-btn-interactive-area"></span>
        </button>
      </div>
    </ModalOverlay>
  );
}
