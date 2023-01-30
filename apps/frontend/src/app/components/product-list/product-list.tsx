import { Product } from '@guitar-shop/core';
import ProductCard from '../product-card/product-card';

export interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      { products.map((product) => <ProductCard product={ product } />) }
    </div>
  );
}

export default ProductList;
