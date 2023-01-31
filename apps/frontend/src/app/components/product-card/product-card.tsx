import { Product } from '@guitar-shop/core';
import { MAX_RATING, RATING_EXPRESSION } from '../../app.constant';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const { photo, title, totalRating, price, commentsCount } = product;

  const setStarLink = (index: number) => {
    return `#icon${(totalRating && index < totalRating) ? '-full-' : '-'}star`;
  };

  const getRatingExpression = (): string => {
    return RATING_EXPRESSION[ totalRating ? totalRating : 0 ];
  };

  const formatPrice = () => {
    return price.toLocaleString('ru-RU');
  };

  return (
    <div className="product-card">
      <img src={ photo } width="75" height="190" alt={ title } />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array.from({ length: MAX_RATING }, (_, index) => (
              <svg key={ index } width="12" height="11" aria-hidden="true">
                <use xlinkHref={ setStarLink(index) }></use>
              </svg>
            ))
          }
          <p className="visually-hidden">Рейтинг: { getRatingExpression() }</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{ commentsCount }</p>
        </div>
        <p className="product-card__title">{ title }</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{ formatPrice() } ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
