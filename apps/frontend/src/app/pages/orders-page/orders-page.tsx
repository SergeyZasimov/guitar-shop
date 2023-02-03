import { ApiQuery, QueryField, SortingOption, SortType } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_PAGINATION } from '../../app.constant';
import { Breadcrumbs, CatalogSort, Pagination } from '../../components';
import { OrderCard } from '../../components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { fetchOrders } from '../../store/features/orders/api-actions';
import { getOrders } from '../../store/features/orders/order-slice';
import { createQueryString } from '../../utils';

export interface OrdersPageProps { }

export function OrdersPage(props: OrdersPageProps): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

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
          <ul className="orders__list">
            {
              orders.map((order) => <OrderCard key={ order.id } order={ order } />)
            }
          </ul>
          <Pagination
            location={ pathname }
            currentPage={ query.page as number }
            onPageClick={ handlePageChange }
          />
        </div>
      </section>
    </main>
  );
}

