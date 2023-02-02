import { Product } from '@guitar-shop/core';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/store.hooks';
import { getProductLoadingStatus } from '../../store/features/product/product-slice';
import { LoadingStatus } from '../../types';
import { CartAddModal } from '../cart-add-modal/cart-add-modal';
import { CartSuccessAddModal } from '../cart-success-add-modal/cart-success-add-modal';
import { Loader } from '../loader/loader';
import ProductCard from '../product-card/product-card';

export interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps): JSX.Element {
  const loadingStatus = useAppSelector(getProductLoadingStatus);

  const [ isCartAddModalShow, setIsCartAddModalShow ] = useState<boolean>(false);
  const [ isCartAddSuccessModalShow, setIsCartAddSuccessModalShow ] = useState<boolean>(false);
  const [ currentProduct, setCurrentProduct ] = useState<Product | null>(null);

  const handleCartAddModalOpen = (product: Product) => {
    setCurrentProduct(product);
    setIsCartAddModalShow(true);
  };

  if (loadingStatus === LoadingStatus.Loading) {
    return <Loader />;
  }

  return (
    <>
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

export default ProductList;
