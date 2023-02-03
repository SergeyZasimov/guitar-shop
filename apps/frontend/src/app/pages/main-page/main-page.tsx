import { DEFAULT_PRODUCT_QUERY, PriceRange, ProductQuery, QueryField } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { Breadcrumbs, CatalogFilter, CatalogSort, Pagination, ProductList } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { queryProducts } from '../../store/features/product/api-actions';
import { getProducts } from '../../store/features/product/product-slice';
import { FilterProperty, FilterPropertyValue } from '../../types/component.type';
import { checkValueInCollection, createQueryString } from '../../utils';

export function MainPage() {
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  const [ query, setQuery ] = useState<ProductQuery>({});

  const [ sort, setSort ] = useState({
    [ QueryField.SortType ]: DEFAULT_PRODUCT_QUERY[ QueryField.SortType ],
    [ QueryField.SortingOption ]: DEFAULT_PRODUCT_QUERY[ QueryField.SortingOption ]
  });



  const handleFilterChange = (
    property: FilterProperty,
    value: FilterPropertyValue
  ): void => {
    let newQuery = { ...query };
    let filterCollection: typeof value[] = query[ property ] || [];
    if (filterCollection) {
      filterCollection = checkValueInCollection<typeof value>(filterCollection, value);
      if (filterCollection.length === 0) {
        delete newQuery[ property ];
      } else {
        newQuery = { ...newQuery, [ property ]: filterCollection };
      }
    }
    setQuery({ ...newQuery });
  };

  const handleSortChange = (newQuery: ProductQuery): void => {
    setSort({ ...sort, ...newQuery });
    setQuery({ ...query, ...newQuery });
  };

  const handleResetFilters = () => {
    setSort({
      [ QueryField.SortType ]: DEFAULT_PRODUCT_QUERY[ QueryField.SortType ],
      [ QueryField.SortingOption ]: DEFAULT_PRODUCT_QUERY[ QueryField.SortingOption ]
    });
    setQuery({});
  };

  const handlePageChange = (page: number) => {
    setQuery({ ...query, page });
  };

  const handlePriceRangeChange = (priceRange: PriceRange) => {
    setQuery({ ...query, priceRange });
  };



  useEffect(() => {
    dispatch(queryProducts(createQueryString({ ...query })));
  }, [ query ]);

  return (
    <>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter
              onPriceRangeChange={ handlePriceRangeChange }
              onFilterChange={ handleFilterChange }
              onResetFilters={ handleResetFilters }
            />

            <CatalogSort
              sortOption={ sort[ QueryField.SortingOption ] }
              sortType={ sort[ QueryField.SortType ] }
              onSortChange={ handleSortChange }
            />
            <ProductList products={ products } />
            <Pagination onPageClick={ handlePageChange } />
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;;;
