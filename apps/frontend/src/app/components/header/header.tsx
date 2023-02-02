import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';
import { AppRoute } from '../../utils';

export function Header(): JSX.Element {
  const user = useAppSelector(getUser);

  return (
    <header className={ `header ${user && "header--logged-empty"}` } id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to={ AppRoute.Root } className="header__logo logo">
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
          </Link>
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
              <li className="main-nav__item">
                <NavLink
                  className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                  to={AppRoute.NotFound}
                >Где купить?
                </NavLink>
              </li>
              <li className="main-nav__item">
                <NavLink
                  className={ ({ isActive }) => isActive ? "link main-nav__link link--current" : "link main-nav__link" }
                  to={AppRoute.NotFound}
                >О компании
                </NavLink>
              </li>
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
              <span className="header__cart-count">2</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
