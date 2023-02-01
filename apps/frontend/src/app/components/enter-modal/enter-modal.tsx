import { Link } from 'react-router-dom';
import { AppRoute, ModalClass } from '../../app.constant';
import { ModalProps } from '../../types/component.type';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export interface EnterModalProps extends ModalProps { }

export function EnterModal(props: EnterModalProps) {

  return (
    <ModalOverlay { ...props } modalClassName={ ModalClass.Enter }>
      <div className="modal__content">
        <div className="modal-enter">
          <h2 className="modal-enter__title">Для выполнения данного действия необходимо войти в&nbsp;систему</h2>
          <Link className="button button--big modal-enter__link" to={ AppRoute.Login }>Войти</Link>
          <p className="modal-enter__text">Если у вас ещё нет аккаунта, необходимо <br />
            <Link to={ AppRoute.Register }>Зарегистрироваться</Link>
          </p>
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

export default EnterModal;
