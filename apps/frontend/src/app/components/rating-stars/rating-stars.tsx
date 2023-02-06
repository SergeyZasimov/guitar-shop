import { MAX_RATING, RATING_EXPRESSION, RatingStarsLocation } from '../../app.constant';

const STAR_SIZE = {
  [ RatingStarsLocation.Catalog ]: { width: "12", height: "12" },
  [ RatingStarsLocation.Product ]: { width: "14", height: "14" },
  [ RatingStarsLocation.Comment ]: { width: "16", height: "16" },
};

export interface RatingStarsProps {
  rating: number | undefined,
  commentsCount?: number | undefined;
  location: keyof typeof STAR_SIZE;
}

export function RatingStars({ rating, commentsCount, location }: RatingStarsProps): JSX.Element {

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
      {
        location !== RatingStarsLocation.Comment &&
        <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{ commentsCount }</p>
      }
    </>
  );
}
