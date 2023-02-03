import { PriceRange, ProductQuery, QueryField } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { DEFAULT_ADMIN_SORT, DEFAULT_CUSTOMER_SORT, DEFAULT_PAGINATION } from '../../app.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { fetchProducts } from '../../store/features/product/api-actions';
import { getProducts } from '../../store/features/product/product-slice';
import { FilterProperty, FilterPropertyValue } from '../../types';
import { AppRoute, checkValueInCollection, createQueryString } from '../../utils';
import { CatalogFilter } from '../catalog-filter/catalog-filter';
import { CatalogSort } from '../catalog-sort/catalog-sort';
import { CommoditiesList } from '../commodities-list/commodities-list';
import { Pagination } from '../pagination/pagination';
import { PriceRangeFilter } from '../price-range-filter/price-range-filter';
import ProductList from '../product-list/product-list';


export interface CatalogProps {
  location: string;
}

export function Catalog({ location }: CatalogProps) {
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  const initialSort = location === AppRoute.Root
    ? DEFAULT_CUSTOMER_SORT
    : DEFAULT_ADMIN_SORT;

  const initialQuery: ProductQuery = {
    page: DEFAULT_PAGINATION.ACTIVE_PAGE_NUMBER,
    sortType: initialSort.TYPE,
    sortingOption: initialSort.OPTION,
    guitarType: [],
    stringsNumber: [],
  };

  const [ query, setQuery ] = useState<ProductQuery>(initialQuery);
  const [ isPriceShouldReset, setIsPriceShouldReset ] = useState<boolean>(false);


  const handleFiltersChange = (
    property: FilterProperty,
    value: FilterPropertyValue
  ): void => {
    let filterCollection: typeof value[] = query[ property ] || [];
    filterCollection = checkValueInCollection<typeof value>(filterCollection, value);
    const newFilter = { ...query, [ property ]: filterCollection };
    setQuery({ ...query, ...newFilter, page: DEFAULT_PAGINATION.ACTIVE_PAGE_NUMBER });
  };

  const handleSortChange = (newSort: ProductQuery) => {
    setQuery({ ...query, ...newSort });
  };

  const handlePageChange = (page: number) => {
    setQuery({ ...query, page });
  };

  const handlePriceRangeChange = (priceRange: PriceRange) => {
    setQuery({ ...query, priceRange });
  };

  const handleReset = () => {
    setIsPriceShouldReset(true);
    setQuery(initialQuery);
  };

  useEffect(() => {
    dispatch(fetchProducts(createQueryString({ ...query })));
  }, [ query ]);

  useEffect(() => {
    if (isPriceShouldReset) {
      setIsPriceShouldReset(false);
    }
  }, [ isPriceShouldReset ]);

  return (
    <>
      <div className="catalog">

        <form className="catalog-filter">
          <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

          {
            location === AppRoute.Root &&
            <PriceRangeFilter
              isShouldPriceReset={ isPriceShouldReset }
              onPriceRangeChange={ handlePriceRangeChange }
            />
          }

          <CatalogFilter
            filters={ { [ QueryField.GuitarTypeFilter ]: query.guitarType, [ QueryField.StringsNumberFilter ]: query.stringsNumber } }
            onFiltersChange={ handleFiltersChange }
          />

          <button
            className="catalog-filter__reset-btn button button--black-border button--medium"
            type="reset"
            onClick={ handleReset }
          >Очистить</button>
        </form>

        <CatalogSort
          sort={ { [ QueryField.SortType ]: query.sortType, [ QueryField.SortingOption ]: query.sortingOption } }
          location={ location }
          onSortChange={ handleSortChange }
        />

        {
          location === AppRoute.Commodities
            ? <CommoditiesList products={ products } />
            : <ProductList products={ products } />
        }


      </div>

      {
        location === AppRoute.Commodities &&
        <button
          className="button product-list__button button--red button--big"
        >
          Добавить новый товар
        </button>
      }

      <Pagination
        currentPage={ query.page as number }
        location={ location }
        onPageClick={ handlePageChange }
      />
    </>
  );
}

