import { Product } from '@guitar-shop/core';
import { CommoditiesCard } from '../commodities-card/commodities-card';

export interface CommoditiesListProps {
  products: Product[];
}

export function CommoditiesList({ products }: CommoditiesListProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {
          products.map((product) => <CommoditiesCard key={ product.id } product={ product } />)
        }
      </ul>
    </div>
  );
}

