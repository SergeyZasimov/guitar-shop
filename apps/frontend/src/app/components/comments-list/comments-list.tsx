import { Comment } from '@guitar-shop/core';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DEFAULT_COMMENTS_COUNT, ERROR_MESSAGE } from '../../app.constant';
import { useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';
import { CommentItem } from '../comment-item/comment-item';

export interface CommentsListProps {
  comments: Comment[];
  onClickAddComment: () => void;
}

export function CommentsList({ comments, onClickAddComment }: CommentsListProps): JSX.Element {

  const user = useAppSelector(getUser);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" onClick={ onClickAddComment }>Оставить отзыв</a>
      {
        comments.map((comment) => <CommentItem key={ comment.id } comment={ comment } />)
      }
      {
        comments.length >= DEFAULT_COMMENTS_COUNT &&
        <button className="button button--medium reviews__more-button">
          Показать еще отзывы
        </button>
      }
      {
        comments.length > 0 &&
        <a
          className="button button--up button--red-border button--big reviews__up-button"
          href="#header"
        >
          Наверх
        </a>
      }
    </section>
  );
}
