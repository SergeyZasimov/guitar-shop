import { useEffect, useState } from 'react';
import { DEFAULT_PAGINATION } from '../../app.constant';
import { useAppSelector } from '../../hooks/store.hooks';
import { getTotalProductsCount } from '../../store/features/product/product-slice';

const { ACTIVE_PAGE_NUMBER, BUTTONS_COUNT, PRODUCT_CARDS_COUNT } = DEFAULT_PAGINATION;

export interface PaginationProps {
  onPageClick: (page: number) => void;
}

export function Pagination({ onPageClick }: PaginationProps): JSX.Element {

  const totalProductsCount = useAppSelector(getTotalProductsCount);

  const totalPagesCount = Math.ceil(totalProductsCount / PRODUCT_CARDS_COUNT);

  const pagesLength = totalPagesCount < BUTTONS_COUNT ? totalPagesCount : BUTTONS_COUNT;

  const [ currentPage, setCurrentPage ] = useState<number>(ACTIVE_PAGE_NUMBER);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    onPageClick(currentPage);
  }, [ currentPage ]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          currentPage !== ACTIVE_PAGE_NUMBER && totalProductsCount !== 0 &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              onClick={ () => setCurrentPage(currentPage - 1) }
            >Назад
            </a>
          </li>
        }
        {
          Array.from({ length: pagesLength }, (_, index) => {
            const pageNumber = index + 1 +
              (currentPage > BUTTONS_COUNT
                ? currentPage - BUTTONS_COUNT
                : 0
              );

            return (
              <li
                key={ index }
                className={ `pagination__page ${pageNumber === currentPage && 'pagination__page--active'}` }
              >
                <a
                  className="link pagination__page-link"
                  onClick={ () => handlePageClick(pageNumber) }
                >
                  { pageNumber }
                </a>
              </li>
            );
          })
        }
        {
          currentPage !== totalPagesCount && totalProductsCount !== 0 &&
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              onClick={ () => setCurrentPage(currentPage + 1) }
            >
              Далее
            </a>
          </li>
        }
      </ul>
    </div>
  );
}
