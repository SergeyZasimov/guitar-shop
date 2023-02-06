import { CommentResponse, User } from '@guitar-shop/core';
import { RatingStarsLocation } from '../../app.constant';
import { formateCommentDate } from '../../utils';
import { RatingStars } from '../rating-stars/rating-stars';

export interface CommentItemProps {
  comment: CommentResponse;
}

export function CommentItem({ comment }: CommentItemProps): JSX.Element {
  const { author, createdAt, rating, advantages, disadvantages, text } = comment;
  const { userName } = author as User;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{ userName }</h4>
        <span className="review__date">{ formateCommentDate(createdAt) }</span>
      </div>
      <div className="rate review__rating-panel">
        <RatingStars
          rating={ rating }
          location={ RatingStarsLocation.Comment }
        />
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{ advantages }</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{ disadvantages }</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{ text }</p>
    </div>
  );
}
