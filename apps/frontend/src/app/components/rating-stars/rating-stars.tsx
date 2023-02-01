import { AppRoute, MAX_RATING, RATING_EXPRESSION } from '../../app.constant';

const STAR_SIZE = {
  [ AppRoute.Root ]: { width: "12", height: "11" },
  [ AppRoute.Product ]: { width: "14", height: "14" }
};

export interface RatingStarsProps {
  rating: number | undefined,
  commentsCount: number | undefined;
  location: keyof typeof STAR_SIZE;
}

export function RatingStars({ rating, commentsCount, location }: RatingStarsProps) {

  const starSize = STAR_SIZE[ location ];

  const getRatingExpression = (rating: number | undefined): string => {
    return RATING_EXPRESSION[ rating ? rating : 0 ];
  };

  const setStarFull = (index: number, rating: number | undefined) => {
    return `#icon${(rating && index < rating) ? '-full-' : '-'}star`;
  };

  return (
    <>
      {
        Array.from({ length: MAX_RATING }, (_, index) => (
          <svg key={ index } width={ starSize.width } height={ starSize.width } aria-hidden="true">
            <use xlinkHref={ setStarFull(index, rating) }></use>
          </svg>
        ))
      }
      <p className="visually-hidden">Рейтинг: { getRatingExpression(rating) }</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{ commentsCount }</p>

    </>
  );
}
