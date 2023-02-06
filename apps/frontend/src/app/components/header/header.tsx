import { UserRole } from '@guitar-shop/core';
import classnames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.hooks';
import { getCartItemsIds } from '../../store/features/cart/cart-slice';
import { getUser } from '../../store/features/user/user-slice';
import { AppRoute } from '../../utils';

export function Header(): JSX.Element {
  const user = useAppSelector(getUser);
  const cart = useAppSelector(getCartItemsIds);
  const { pathname } = useLocation();

  const headerClass = classnames({
    'header': true,
    'header--logged-empty': user && !cart.length,
    'header--logged': user && cart.length,
    'header--admin': user && user.role === UserRole.Admin
  });

  return (
    <header
      className={ headerClass }
      id="header"
    >
      <div className="container">
        <div className="header__wrapper">
          <NavLink to={ pathname !== AppRoute.Root ? AppRoute.Root : '#' } className="header__logo logo" end>
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
          </NavLink>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <NavLink
                  className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                  to={ AppRoute.Root }
                  end
                >Каталог
                </NavLink>
              </li>
              { !user || user?.role === UserRole.Customer ?
                <>
                  <li className="main-nav__item">
                    <NavLink
                      className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                      to={ AppRoute.NotFound }
                    >
                      Где купить?
                    </NavLink>
                  </li>
                  <li className="main-nav__item">
                    <NavLink
                      className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                      to={ AppRoute.NotFound }
                    >
                      О компании
                    </NavLink>
                  </li>
                </>
                :
                <>
                  <li className="main-nav__item">
                    <NavLink
                      className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                      to={ AppRoute.Orders }
                    >
                      Список заказов
                    </NavLink>
                  </li>
                  <li className="main-nav__item">
                    <NavLink
                      className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                      to={ AppRoute.Commodities }
                    >
                      Список товаров
                    </NavLink>
                  </li>
                </>
              }
            </ul>
          </nav>
          <div className="header__container">
            <span className={ user?.userName ? '' : "header__user-name" }>{ user?.userName }</span>
            <Link className="header__link" to={ AppRoute.Login } aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>

            <Link className="header__cart-link" to={ AppRoute.Cart } aria-label="Перейти в корзину">
              <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
              <span className="header__cart-count">{ cart.length }</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
