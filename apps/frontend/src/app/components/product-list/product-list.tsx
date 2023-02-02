import { Product } from '@guitar-shop/core';
import { useState } from 'react';
import { CartAddModal } from '../cart-add-modal/cart-add-modal';
import { CartSuccessAddModal } from '../cart-success-add-modal/cart-success-add-modal';
import ProductCard from '../product-card/product-card';

export interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps): JSX.Element {
  const [ isCartAddModalShow, setIsCartAddModalShow ] = useState<boolean>(false);
  const [ isCartAddSuccessModalShow, setIsCartAddSuccessModalShow ] = useState<boolean>(false);
  const [ currentProduct, setCurrentProduct ] = useState<Product | null>(null);

  const handleCartAddModalOpen = (product: Product) => {
    setCurrentProduct(product);
    setIsCartAddModalShow(true);
  };

  return (
    <>
      <CartAddModal
        product={ currentProduct }
        isOpen={ isCartAddModalShow }
        onClickCloseModal={ () => setIsCartAddModalShow(false) }
        onSuccessAdd={() => setIsCartAddSuccessModalShow(true)}
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
