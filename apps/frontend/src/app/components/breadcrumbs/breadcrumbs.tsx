import classNames from 'classnames';
import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, BreadcrumbsTitles } from '../../utils';

const breadcrumbsPaths = Object.keys(BreadcrumbsTitles);

export interface BreadcrumbsProps {
  entityTitle?: string;
}

function Breadcrumbs({ entityTitle }: BreadcrumbsProps): JSX.Element {
  const { pathname } = useLocation();

  const breadcrumbs = breadcrumbsPaths.filter((item) => pathname.includes(item));

  const findBreadcrumb = (item: string) => {
    const currPath = breadcrumbsPaths.find((path) => path.includes(item));
    return BreadcrumbsTitles[ currPath as keyof typeof BreadcrumbsTitles ];
  };

  const breadcrumbsClassName = classNames({
    'breadcrumbs': true,
    'page-content__breadcrumbs': pathname === AppRoute.Root || pathname.includes(AppRoute.Product),
    'page-content__breadcrumbs--on-cart-page': pathname === AppRoute.Cart,
    'orders__breadcrumps': pathname === AppRoute.Orders
  });

  return (
    <ul
      className={ breadcrumbsClassName }
    >
      <li className="breadcrumbs__item">
        <Link
          className="link"
          to={ pathname === AppRoute.Root ? '#' : AppRoute.Root }
        >
          Каталог
        </Link>
      </li>
      {
        breadcrumbs && breadcrumbs.map((item: string) => (
          <li key={ item } className="breadcrumbs__item">
            <Link
              className="link"
              to={ `${item}` }
            >
              { findBreadcrumb(item) }
            </Link>
          </li>
        )
        )
      }

      {
        entityTitle &&
        <li className="breadcrumbs__item">
          <Link
            className="link"
            to='#'
          >
            { entityTitle }
          </Link>
        </li>
      }
    </ul>
  );
}

export default memo(Breadcrumbs);
