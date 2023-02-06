import { Product, formatPrice } from '@guitar-shop/core';
import { useNavigate } from 'react-router-dom';
import { RatingStarsLocation } from '../../app.constant';
import { useAppDispatch } from '../../hooks/store.hooks';
import { deleteProduct } from '../../store/features/product/api-actions';
import { AppRoute, formateAdminDate } from '../../utils';
import { RatingStars } from '../rating-stars/rating-stars';

export interface CommoditiesCardProps {
  product: Product;
}

export function CommoditiesCard({ product }: CommoditiesCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteProductClick = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={ product.photo } width="36" height="93" alt={ product.title } />
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">{ product.title }</p>
          <div className="rate catalog-item__data-rate">
            <RatingStars
              rating={ product.totalRating }
              location={ RatingStarsLocation.Product }
            />
          </div>
          <p className="catalog-item__data-date">Дата добавления { formateAdminDate(product.createdAt) }</p>
          <p className="catalog-item__data-price">{ formatPrice(product.price) } ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <a
          className="button button--small button--black-border"
          aria-label="Редактировать товар"
          onClick={ () => navigate(`${AppRoute.Commodities}/${product.id}`) }
        >
          Редактировать
        </a>
        <button
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
          onClick={ () => handleDeleteProductClick(product.id as string) }
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

