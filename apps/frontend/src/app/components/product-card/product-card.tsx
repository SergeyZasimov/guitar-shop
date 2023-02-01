import { Product } from '@guitar-shop/core';
import { Link } from 'react-router-dom';
import { AppRoute, RatingStarsLocation } from '../../app.constant';
import { formatPrice } from '../../utils';
import { RatingStars } from '../rating-stars/rating-stars';

export interface ProductCardProps {
  product: Product;
  onAddProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddProductClick }: ProductCardProps): JSX.Element {
  const { photo, title, totalRating, price, commentsCount } = product;

  return (
    <div className="product-card">
      <img src={ photo } width="75" height="190" alt={ title } />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars
            rating={ totalRating }
            commentsCount={ commentsCount }
            location={ RatingStarsLocation.Product } />
        </div>
        <p className="product-card__title">{ title }</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{ formatPrice(price) } ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={ `${AppRoute.Product}/${product.id}` }>Подробнее</Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          onClick={ () => onAddProductClick(product) }
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
