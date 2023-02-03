import { PriceRange, ProductQuery } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { Breadcrumbs, CatalogFilter, CatalogSort, Pagination, ProductList } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { queryProducts } from '../../store/features/product/api-actions';
import { getProducts } from '../../store/features/product/product-slice';
import { createQueryString } from '../../utils';

export function MainPage(): JSX.Element {
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  const [ query, setQuery ] = useState<ProductQuery>({});
  const [ isFilterChange, setIsFilterChange ] = useState<boolean>(false);

  const handleSortChange = (newSort: ProductQuery): void => {
    setQuery({ ...query, ...newSort });
  };

  const handlePageChange = (page: number) => {
    setQuery({ ...query, page });
  };

  const handlePriceRangeChange = (priceRange: PriceRange) => {
    setQuery({ ...query, priceRange });
  };

  const handleFiltersChange = (newFilters: ProductQuery) => {
    setIsFilterChange(true);
    setQuery({ ...query, ...newFilters });
  };

  const handleReset = () => {
    setQuery({});
  };

  useEffect(() => {
    dispatch(queryProducts(createQueryString({ ...query })));
  }, [ query ]);

  useEffect(() => {
    if (isFilterChange) {
      setIsFilterChange(false);
    }
  }, [ isFilterChange ]);

  return (
    <>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>

          <Breadcrumbs />

          <div className="catalog">

            <CatalogFilter
              onPriceRangeChange={ handlePriceRangeChange }
              onFiltersChange={ handleFiltersChange }
              onReset={ handleReset }
            />

            <CatalogSort
              onSortChange={ handleSortChange }
            />

            <ProductList products={ products } />

            <Pagination
              isFilterChange={ isFilterChange }
              onPageClick={ handlePageChange }
            />

          </div>
        </div>
      </main>
    </>
  );
}

