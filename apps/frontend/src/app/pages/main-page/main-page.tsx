import { DEFAULT_PRODUCT_QUERY, ProductQuery, QueryField } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { Breadcrumbs, CatalogFilter, CatalogSort, Footer, Header, Pagination, ProductList } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { sortProducts } from '../../store/features/product/api-actions';
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

  const handleFilterChange =
    (property: FilterProperty, value: FilterPropertyValue): void => {
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

  useEffect(() => {
    dispatch(sortProducts(createQueryString({ ...query })));
  }, [ query ]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter
              onFilterChange={ handleFilterChange }
            />

            <CatalogSort
              sortOption={ sort[ QueryField.SortingOption ] }
              sortType={ sort[ QueryField.SortType ] }
              onSortChange={ handleSortChange }
            />
            <ProductList products={ products } />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;;;
