import { useEffect } from 'react';

export interface CommentAddModalProps {
  isOpen: boolean;
  onClickCloseModal: () => void;
}

export function CommentAddModal({ isOpen, onClickCloseModal }: CommentAddModalProps) {

  const onClickEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClickCloseModal();
    }
  };

  useEffect(() => {
    const displayWidthBefore = document.body.clientWidth;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const displayWidthAfter = document.body.clientWidth;
      document.body.style.paddingRight = `${displayWidthAfter - displayWidthBefore}px`;
      document.addEventListener('keydown', onClickEsc);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.removeEventListener('keydown', onClickEsc);
    };
  }, [ isOpen ]);

  return (
    <div className={ `modal ${isOpen ? 'is-active' : ''} modal--review modal-for-ui-kit` }>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={ onClickCloseModal }></div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <form className="form-review">
            <div className="form-review__wrapper">
              <h3 className="form-review__title">СURT Z30 Plus</h3>
              <div><span className="form-review__label form-review__label--required form-review__label--star">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                  <p className="rate__message">Поставьте оценку</p>
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
            <input className="form-review__input" id="advantage" type="text" autoComplete="off" />
            <p className="form-review__warning">Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input className="form-review__input" id="disadv" type="text" autoComplete="off" />
            <p className="form-review__warning">Заполните поле</p>
            <label className="form-review__label form-review__label--required form-review__label--textarea" htmlFor="comment">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="comment" autoComplete="off"></textarea>
            <p className="form-review__warning">Заполните поле</p>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={ onClickCloseModal }
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
