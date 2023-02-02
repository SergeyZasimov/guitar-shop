import { CommentResponse } from '@guitar-shop/core';
import { useState } from 'react';
import { COMMENT_LIST_OFFSET } from '../../app.constant';
import { useAppSelector } from '../../hooks/store.hooks';
import { getCommentLoadingStatus } from '../../store/features/product/product-slice';
import { LoadingStatus } from '../../types';
import { CommentItem } from '../comment-item/comment-item';
import { Loader } from '../loader/loader';


export interface CommentsListProps {
  comments: CommentResponse[];
  onClickAddComment: () => void;
}

export function CommentsList({ comments, onClickAddComment }: CommentsListProps): JSX.Element {

  const loadingStatus = useAppSelector(getCommentLoadingStatus);

  const [ listSize, setListSize ] = useState<number>(COMMENT_LIST_OFFSET);

  const handleMoreCommentsClick = () => {
    setListSize((prevState) => {
      return prevState + COMMENT_LIST_OFFSET;
    });
  };

  const handleButtonUpClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="reviews">
      {
        loadingStatus === LoadingStatus.Loading ?
          <Loader /> :
          <>
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a className="button button--red-border button--big reviews__sumbit-button" onClick={ onClickAddComment }>Оставить отзыв</a>
            {
              comments.slice(0, listSize).map((comment) => <CommentItem key={ comment.id } comment={ comment } />)
            }
            {
              comments.length >= COMMENT_LIST_OFFSET &&
              comments.length !== comments.slice(0, listSize).length &&
              <button
                className="button button--medium reviews__more-button"
                onClick={ handleMoreCommentsClick }
              >
                Показать еще отзывы
              </button>
            }
            {
              comments.length > 0 &&
              <a
                className="button button--up button--red-border button--big reviews__up-button"
                onClick={ handleButtonUpClick }
                style={ { zIndex: 1 } }
              >
                Наверх
              </a>
            }
          </>
      }
    </section>
  );
}
