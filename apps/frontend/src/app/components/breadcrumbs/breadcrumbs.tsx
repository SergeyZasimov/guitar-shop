import { Link, useLocation } from 'react-router-dom';
import { AppRoute, BreadcrumbsPaths, BreadcrumbsSpelling } from '../../utils';

export function Breadcrumbs(): JSX.Element {
  const { pathname } = useLocation();

  const currPath = BreadcrumbsPaths.find((item) => pathname.split('/').includes(item.slice(1))) as keyof typeof BreadcrumbsSpelling;

  return (
    <ul
      className={ `breadcrumbs page-content__breadcrumbs ${pathname.includes(AppRoute.Cart) && 'page-content__breadcrumbs--on-cart-page'}` }
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
        currPath &&
        <li className="breadcrumbs__item">
          <Link
            className="link"
            to={ pathname.includes(currPath) ? '#' : currPath }
          >
            { BreadcrumbsSpelling[ currPath ] }
          </Link>
        </li>
      }
    </ul>
  );
}
