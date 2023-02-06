import { useAppSelector } from '../../hooks/store.hooks';
import { getProducts } from '../../store/features/product/product-slice';
import { CommoditiesCard } from '../commodities-card/commodities-card';

export function CommoditiesList(): JSX.Element {
  const products = useAppSelector(getProducts);

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

