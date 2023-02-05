export const AppRoute = {
  Root: '/',
  Register: '/register',
  Login: '/login',
  Cart: '/cart',
  Product: '/product',
  NotFound: '*',
  Commodities: '/commodities',
  Orders: '/orders',
  NewProduct: '/new-product',
  EditProduct: '/edit-product'
} as const;

export const RouteNames = Object.values(AppRoute);

export const BreadcrumbsSpelling = {
  [AppRoute.Product]: 'Товар',
  [AppRoute.Cart]: 'Корзина',
} as const;

export const BreadcrumbsPaths = Object.keys(BreadcrumbsSpelling);
