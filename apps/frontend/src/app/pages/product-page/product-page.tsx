import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ERROR_MESSAGE, RatingStarsLocation } from '../../app.constant';
import { CommentAddModal, CommentsList, RatingStars } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { fetchComments } from '../../store/features/comment/api-actions';
import { getComments } from '../../store/features/comment/comment-slice';
import { fetchProduct } from '../../store/features/product/api-actions';
import { getProduct } from '../../store/features/product/product-slice';
import { getUser } from '../../store/features/user/user-slice';
import { formatPrice } from '../../utils';

export function ProductPage(): JSX.Element {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProduct);
  const comments = useAppSelector(getComments);
  const user = useAppSelector(getUser);


  const [ isDescriptionShow, setIsDescriptionShow ] = useState(false);

  const [ isAddCommentModalOpen, setIsAddCommentModalOpen ] = useState<boolean>(false);

  const handleAddCommentClick = () => {
    if (!user) {
      toast.error(ERROR_MESSAGE.UNAUTHORIZED);
      return;
    }

    setIsAddCommentModalOpen(true);
  };

  const handleClickCloseModal = () => {
    setIsAddCommentModalOpen(false);
  };


  useEffect(() => {
    if (typeof productId === 'string') {
      dispatch(fetchProduct(productId));
      dispatch(fetchComments(productId));
    }
  }, [ productId ]);

  return (
    <>
      <CommentAddModal isOpen={ isAddCommentModalOpen } onClickCloseModal={handleClickCloseModal} />
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
                <RatingStars
                  rating={ product?.totalRating }
                  commentsCount={ product?.commentsCount }
                  location={ RatingStarsLocation.Product } />
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
          <CommentsList
            comments={ comments }
            onClickAddComment={ handleAddCommentClick }
          />
        </div>
      </main >
    </>
  );
}

export default ProductPage;
