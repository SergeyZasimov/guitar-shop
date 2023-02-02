import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalClass } from '../../app.constant';
import { ModalProps } from '../../types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { AppRoute } from '../../utils';

export interface SuccessReviewModalProps extends ModalProps { }

export function SuccessReviewModal(props: PropsWithChildren<SuccessReviewModalProps>): JSX.Element {
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    props.onClickCloseModal();
    navigate(AppRoute.Root);
  };
  return (
    <ModalOverlay modalClassName={ ModalClass.SuccessReview } { ...props }>
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Спасибо за ваш отзыв!</p>
        <div className="modal__button-container modal__button-container--review">
          <button
            className="button button--small modal__button modal__button--review"
            onClick={ handleNextButtonClick }
          >К покупкам!</button>
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
