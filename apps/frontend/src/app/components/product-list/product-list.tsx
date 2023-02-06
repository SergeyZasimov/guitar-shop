import { Product } from '@guitar-shop/core';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/store.hooks';
import { getProductLoadingStatus, getProducts } from '../../store/features/product/product-slice';
import { getUser } from '../../store/features/user/user-slice';
import { LoadingStatus } from '../../types';
import { CartAddModal } from '../cart-add-modal/cart-add-modal';
import { CartSuccessAddModal } from '../cart-success-add-modal/cart-success-add-modal';
import { EnterModal } from '../enter-modal/enter-modal';
import { Loader } from '../loader/loader';
import { ProductCard } from '../product-card/product-card';

export function ProductList(): JSX.Element {
  const products = useAppSelector(getProducts);
  const user = useAppSelector(getUser);

  const loadingStatus = useAppSelector(getProductLoadingStatus);

  const [ isCartAddModalShow, setIsCartAddModalShow ] = useState<boolean>(false);
  const [ isCartAddSuccessModalShow, setIsCartAddSuccessModalShow ] = useState<boolean>(false);
  const [ currentProduct, setCurrentProduct ] = useState<Product | null>(null);
  const [ isEnterModalOpen, setIsEnterModalOpen ] = useState<boolean>(false);


  const handleCartAddModalOpen = (product: Product) => {
    if (user) {
      setCurrentProduct(product);
      setIsCartAddModalShow(true);
    } else {
      setIsEnterModalOpen(true);
    }

  };

  if (loadingStatus === LoadingStatus.Loading) {
    return <Loader />;
  }

  return (
    <>
      <EnterModal
        isOpen={ isEnterModalOpen }
        onClickCloseModal={ () => setIsEnterModalOpen(false) }
      />
      <CartAddModal
        product={ currentProduct }
        isOpen={ isCartAddModalShow }
        onClickCloseModal={ () => setIsCartAddModalShow(false) }
        onSuccessAdd={ () => setIsCartAddSuccessModalShow(true) }
      />
      <CartSuccessAddModal
        isOpen={ isCartAddSuccessModalShow }
        onClickCloseModal={ () => setIsCartAddSuccessModalShow(false) }
      />
      <div className="cards catalog__cards">
        { products.map((product) =>
          <ProductCard
            key={ product.id }
            product={ product }
            onAddProductClick={ handleCartAddModalOpen }
          />) }
      </div>

    </>
  );
}

