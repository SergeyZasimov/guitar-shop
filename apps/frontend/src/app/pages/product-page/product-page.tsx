import { formatPrice } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { GUITAR_TYPE_EXPRESSION, RatingStarsLocation } from '../../app.constant';
import { Breadcrumbs, CartAddModal, CartSuccessAddModal, CommentAddModal, CommentsList, EnterModal, RatingStars, SuccessReviewModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { fetchComments, fetchProduct } from '../../store/features/product/api-actions';
import { getComments, getProduct } from '../../store/features/product/product-slice';
import { getUser } from '../../store/features/user/user-slice';
import { AppRoute } from '../../utils';

export function ProductPage(): JSX.Element {
  const { productId } = useParams();

  const dispatch = useAppDispatch();

  const product = useAppSelector(getProduct);
  const comments = useAppSelector(getComments);
  const user = useAppSelector(getUser);

  const [ isDescriptionShow, setIsDescriptionShow ] = useState<boolean>(false);
  const [ isAddCommentModalOpen, setIsAddCommentModalOpen ] = useState<boolean>(false);
  const [ isEnterModalOpen, setIsEnterModalOpen ] = useState<boolean>(false);
  const [ isSuccessReviewModalOpen, setIsSuccessReviewModalOpen ] = useState<boolean>(false);
  const [ isCartAddModalOpen, setIsCartAddModalOpen ] = useState<boolean>(false);
  const [ isCartAddSuccessModalShow, setIsCartAddSuccessModalShow ] = useState<boolean>(false);

  const handleOpenAddCommentClick = (): void => {
    if (!user) {
      setIsEnterModalOpen(true);
      return;
    }
    setIsAddCommentModalOpen(true);
  };

  useEffect(() => {
    if (typeof productId === 'string') {
      dispatch(fetchProduct(productId));
      dispatch(fetchComments(productId));
    }
  }, [ productId ]);

  if (!product) {
    return <Navigate to={ AppRoute.Root } />;
  }

  return (
    <>
      <EnterModal
        isOpen={ isEnterModalOpen }
        onClickCloseModal={ () => setIsEnterModalOpen(false) }
      />
      <CommentAddModal
        productId={ product.id }
        productTitle={ product.title }
        isOpen={ isAddCommentModalOpen }
        onClickCloseModal={ () => setIsAddCommentModalOpen(false) }
        onSuccessReview={ () => setIsSuccessReviewModalOpen(true) }
      />
      <SuccessReviewModal
        isOpen={ isSuccessReviewModalOpen }
        onClickCloseModal={ () => setIsSuccessReviewModalOpen(false) }
      />
      <CartAddModal
        isOpen={ isCartAddModalOpen }
        onClickCloseModal={ () => setIsCartAddModalOpen(false) }
        product={ product }
        onSuccessAdd={ () => setIsCartAddSuccessModalShow(true) }
      />
      <CartSuccessAddModal
        isOpen={ isCartAddSuccessModalShow }
        onClickCloseModal={ () => setIsCartAddSuccessModalShow(false) }
      />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <Breadcrumbs />
          <div className="product-container">
            <img className="product-container__img" src={ product.photo } width="90" height="235" alt={ product.title } />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{ product.title }</h2>
              <div className="rate product-container__rating">
                <RatingStars
                  rating={ product.totalRating }
                  commentsCount={ product.commentsCount }
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
                        <td className="tabs__value">{ GUITAR_TYPE_EXPRESSION[ product.guitarType ] }</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{ product.stringsNumber } струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={ `tabs__product-description ${!isDescriptionShow ? 'hidden' : ''} ` }>
                    { product.description }
                  </p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{ formatPrice(product.price) } ₽</p>
              <a
                className="button button--red button--big product-container__button"
                onClick={ () => setIsCartAddModalOpen(true) }
              >Добавить в корзину
              </a>
            </div>
          </div>
          <CommentsList
            comments={ comments }
            onClickAddComment={ handleOpenAddCommentClick }
          />
        </div>
      </main >
    </>
  );
}


