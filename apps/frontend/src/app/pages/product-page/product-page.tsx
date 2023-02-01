import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppRoute } from '../../app.constant';
import { RatingStars } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { fetchProduct } from '../../store/features/product/api-actions';
import { getProduct } from '../../store/features/product/product-slice';
import { formatPrice } from '../../utils';

export function ProductPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProduct);

  const [ isDescriptionShow, setIsDescriptionShow ] = useState(false);

  useEffect(() => {
    if (typeof productId === 'string') {
      dispatch(fetchProduct(productId));
    }
  }, [ productId ]);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">Товар</a>
          </li>
        </ul>
        <div className="product-container">
          <img className="product-container__img" src={ product?.photo } width="90" height="235" alt={ product?.title } />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{ product?.title }</h2>
            <div className="rate product-container__rating">
              <RatingStars rating={ product?.totalRating } commentsCount={ product?.commentsCount } location={ AppRoute.Product } />
            </div>
            <div className="tabs">
              <a
                className={ `button ${isDescriptionShow ? 'button--black-border' : ''}  button--medium tabs__button` }
                onClick={ () => setIsDescriptionShow(false) }
              >Характеристики</a>
              <a
                className={ `button ${!isDescriptionShow ? 'button--black-border' : ''}  button--medium tabs__button` }
                onClick={ () => setIsDescriptionShow(true) }
              >Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className={ `tabs__table ${isDescriptionShow ? 'hidden' : ''}` }>
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{ product?.article }</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">Электрогитара</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{ product?.stringsNumber } струнная</td>
                    </tr>
                  </tbody>
                </table>
                <p className={ `tabs__product-description ${!isDescriptionShow ? 'hidden' : ''} ` }>
                  { product?.description }
                </p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{ formatPrice(product?.price) } ₽</p>
            <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>
        <section className="reviews">
          <h3 className="reviews__title title title--bigger">Отзывы</h3>
          <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
          <div className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
              <span className="review__date">12 декабря</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
          </div>
          <div className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
          </div>
          <div className="review">
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
            </div>
            <div className="rate review__rating-panel">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">Тугие колонки</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
          </div>
          <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
        </section>
      </div>
    </main >
  );
}

export default ProductPage;
