import classNames from 'classnames';
import { DEFAULT_PAGINATION } from '../../app.constant';
import { useAppSelector } from '../../hooks/store.hooks';
import { getTotalProductsCount } from '../../store/features/product/product-slice';
import { AppRoute } from '../../utils';

const { ACTIVE_PAGE_NUMBER, BUTTONS_COUNT, PRODUCT_CARDS_COUNT } = DEFAULT_PAGINATION;

export interface PaginationProps {
  length: number;
  currentPage: number;
  location: string;
  onPageClick: (page: number) => void;
}

export function Pagination({ onPageClick, location, currentPage, length }: PaginationProps): JSX.Element {

  const totalPagesCount = Math.ceil(length / PRODUCT_CARDS_COUNT);

  const pagesLength = totalPagesCount < BUTTONS_COUNT ? totalPagesCount : BUTTONS_COUNT;

  const paginationClassName = classNames({
    'pagination': true,
    'page-content__pagination': location === AppRoute.Root,
    'product-list__pagination': location === AppRoute.Commodities
  });

  return (
    <div className={ paginationClassName }>
      <ul className="pagination__list">
        {
          currentPage !== ACTIVE_PAGE_NUMBER && length !== 0 &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              onClick={ () => onPageClick(currentPage - 1) }
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
                  onClick={ () => onPageClick(pageNumber) }
                >
                  { pageNumber }
                </a>
              </li>
            );
          })
        }
        {
          currentPage !== totalPagesCount && length !== 0 &&
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              onClick={ () => onPageClick(currentPage + 1) }
            >
              Далее
            </a>
          </li>
        }
      </ul>
    </div>
  );
}
