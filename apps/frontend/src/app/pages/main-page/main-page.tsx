import { DEFAULT_PRODUCT_SORTING, ProductQuery, ProductSortingOption, QueryField, SortType } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { Breadcrumbs, CatalogFilter, CatalogSort, Footer, Header, Pagination, ProductList } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { sortProducts } from '../../store/features/product/api-actions';
import { getProducts } from '../../store/features/product/product-slice';


export function MainPage() {
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  const [ sort, setSort ] = useState(DEFAULT_PRODUCT_SORTING);

  const createQueryString = (query: ProductQuery): string => {
    return `?${Object.entries(query)
      .map(([ key, value ]) => `${key}=${value}`)
      .join('&')}`;
  };

  const handleChangeSortOption = (option: ProductSortingOption) => {
    setSort({ ...sort, [ QueryField.SortingOption ]: option });
  };

  const handleChangeSortType = (type: SortType) => {
    setSort({ ...sort, [ QueryField.SortType ]: type });
  };

  useEffect(() => {
    dispatch(sortProducts(createQueryString({ ...sort })));
  }, [ sort ]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort sortOption={ sort.sortingOption } sortType={ sort.sortType } onChangeSortOption={ handleChangeSortOption } onChangeSortType={ handleChangeSortType } />
            <ProductList products={ products } />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
