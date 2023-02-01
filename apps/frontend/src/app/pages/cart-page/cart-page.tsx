import { CartItem } from '../../components';
import { useAppSelector } from '../../hooks/store.hooks';
import { getCartItemsIds } from '../../store/features/cart/cart-slice';

export interface CartProps { }
// TODO: итог
export function CartPage(props: CartProps) {

  const cartItemsIds = useAppSelector(getCartItemsIds);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">Корзина</a>
          </li>
        </ul>
        <div className="cart">
          {
            cartItemsIds.map(id => <CartItem key={ id } cartItemId={ id } />)
          }
          <div className="cart__footer">
            <div className="cart__total-info">
              <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">52 000 ₽</span></p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

