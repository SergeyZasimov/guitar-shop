import { CommentField, NewComment } from '@guitar-shop/core';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { MAX_RATING, ModalClass } from '../../app.constant';
import { useAppDispatch } from '../../hooks/store.hooks';
import { createComment } from '../../store/features/product/api-actions';
import { ModalProps } from '../../types/component.type';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const initialNewComment: NewComment = {
  advantages: '',
  disadvantages: '',
  rating: 0,
  text: '',
  product: ''
};

export interface CommentAddModalProps extends ModalProps {
  productId: string | undefined;
  productTitle: string | undefined;
  onSuccessReview: () => void;
}

export function CommentAddModal(props: CommentAddModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { productId, productTitle, ...modalProps } = props;

  const [ newComment, setNewComment ] = useState<NewComment>(initialNewComment);

  const handleNewCommentChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setNewComment({ ...newComment, [ name ]: value });
  };

  const handleRatingChange = (rate: number) => {
    setNewComment({ ...newComment, rating: rate });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (productId) {
      dispatch(createComment({ ...newComment, product: productId }));
    }

    props.onClickCloseModal();
    props.onSuccessReview();
  };

  useEffect(() => {
    setNewComment(initialNewComment);
  }, [ props.isOpen ]);

  return (
    <ModalOverlay { ...modalProps } modalClassName={ ModalClass.Review }>
      <FocusLock>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <form className="form-review" onSubmit={ handleSubmit }>
            <div className="form-review__wrapper">
              <h3 className="form-review__title">{ productTitle }</h3>
              <div><span className="form-review__label form-review__label--required form-review__label--star">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {
                    Array.from({ length: MAX_RATING }, (_, index) => {
                      const rate = MAX_RATING - index;
                      return (
                        <Fragment key={ index }>
                          <input
                            className="visually-hidden"
                            id={ `star-${rate}` }
                            name="rate"
                            type="radio"
                            value={ rate }
                            onChange={ () => handleRatingChange(rate) }
                            checked={ newComment.rating === rate }
                            required
                          />
                          <label
                            className="rate__label"
                            htmlFor={ `star-${rate}` }
                            title="Отлично"
                          ></label>
                        </Fragment>
                      );
                    })
                  }
                  <p className="rate__message" style={ { visibility: newComment.rating ? 'hidden' : 'visible' } }>Поставьте оценку</p>
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
            <input
              className="form-review__input"
              id="advantage"
              type="text"
              name={ CommentField.Advantages }
              autoComplete="off"
              value={ newComment.advantages }
              onChange={ handleNewCommentChange }
              required
              tabIndex={ 1 }
              autoFocus
            />
            <p className="form-review__warning" style={ { visibility: newComment.advantages ? 'hidden' : 'visible' } }>Заполните поле</p>
            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input
              className="form-review__input"
              id="disadv"
              type="text"
              autoComplete="off"
              name={ CommentField.Disadvantages }
              value={ newComment.disadvantages }
              onChange={ handleNewCommentChange }
              required
              tabIndex={ 2 }
            />
            <p className="form-review__warning" style={ { visibility: newComment.disadvantages ? 'hidden' : 'visible' } }>Заполните поле</p>
            <label className="form-review__label form-review__label--required form-review__label--textarea" htmlFor="comment">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              autoComplete="off"
              name={ CommentField.Text }
              value={ newComment.text }
              onChange={ handleNewCommentChange }
              required
              tabIndex={ 3 }
            ></textarea>
            <p className="form-review__warning" style={ { visibility: newComment.text ? 'hidden' : 'visible' } }>Заполните поле</p>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>

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
      </FocusLock>
    </ModalOverlay >
  );
}
