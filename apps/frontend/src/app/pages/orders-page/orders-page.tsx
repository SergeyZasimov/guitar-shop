import { ApiQuery, QueryField, SortingOption, SortType } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_PAGINATION } from '../../app.constant';
import { Breadcrumbs, CatalogSort, OrdersList, Pagination } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { fetchOrders } from '../../store/features/orders/api-actions';
import { getOrders, getTotalOrdersCount } from '../../store/features/orders/order-slice';
import { createQueryString } from '../../utils';

export interface OrdersPageProps { }

export function OrdersPage(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const totalOrdersCount = useAppSelector(getTotalOrdersCount);

  const initialQuery: ApiQuery = {
    page: DEFAULT_PAGINATION.ACTIVE_PAGE_NUMBER,
    sortType: SortType.Desc,
    sortingOption: SortingOption.AddedAt,
  };

  const [ query, setQuery ] = useState<ApiQuery>(initialQuery);

  const handleSortChange = (newSort: ApiQuery) => {
    setQuery({ ...query, ...newSort });
  };

  const handlePageChange = (page: number) => {
    setQuery({ ...query, page });
  };

  useEffect(() => {
    dispatch(fetchOrders(createQueryString({ ...query })));
  }, [ query ]);

  return (
    <main className="page-content orders__main">
      <section className="orders">
        <div className="container">
          <h1 className="title title--bigger orders__title">Список заказов</h1>
          <Breadcrumbs />
          <CatalogSort
            location={ pathname }
            sort={ { [ QueryField.SortType ]: query.sortType, [ QueryField.SortingOption ]: query.sortingOption } }
            onSortChange={ handleSortChange }
          />
          <OrdersList orders={ orders } />
          <Pagination
            length={ totalOrdersCount }
            location={ pathname }
            currentPage={ query.page as number }
            onPageClick={ handlePageChange }
          />
        </div>
      </section>
    </main>
  );
}

