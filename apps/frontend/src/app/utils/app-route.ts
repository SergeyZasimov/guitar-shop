export const AppRoute = {
  Root: '/',
  Register: '/register',
  Login: '/login',
  Cart: '/cart',
  Product: '/product',
  NotFound: '*',
  Commodities: '/commodities',
  Orders: '/orders',
  NewProduct: 'new-product',
} as const;

export const RouteNames = Object.values(AppRoute);

export const BreadcrumbsTitles = {
  [AppRoute.Cart]: 'Корзина',
  [AppRoute.Commodities]: 'Товары',
  [AppRoute.NewProduct]: 'Новый товар',
  [AppRoute.Orders]: 'Заказы',
} as const;
