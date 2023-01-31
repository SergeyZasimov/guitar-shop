import { User } from '@guitar-shop/core';

export const BACKEND_URL = 'http://localhost:3333/api/';

export const REQUEST_TIMEOUT = 5000;

export const ACCESS_TOKEN_KEY_NAME = 'guitar-shop-token';

export const AUTHORIZATION = {
  FIELD: 'Authorization',
  BEARER: 'Bearer',
};

export enum StoreNamespace {
  ProductStore = 'product',
  UserStore = 'user',
  CommentStore = 'comment',
  OrderStore = 'order',
}

export const MAX_RATING = 5;

export const RATING_EXPRESSION = [
  'Нет оценок',
  'Дрова',
  'Плохо',
  'Удовлетворительно',
  'Хорошо',
  'Отлично',
] as const;

export enum ActionType {
  RedirectToRoute = 'app/redirectToRoute',
  FetchProducts = 'product/fetch',
  QueryProducts = 'product/query',
  RegisterUser = 'user/register',
  LoginUser = 'user/login',
  CheckUser = 'user/checkStatus',
}

export enum AppRoute {
  Root = '/',
  Register = '/register',
  Login = '/login',
  Cart = '/cart',
}

export const INITIAL_USER_STATE: User = {
  userName: '',
  email: '',
};

export const SUCCESS_MESSAGE = {
  SUCCESS_REGISTER:
    'Вы успешно зарегистрировались. На почту выслано письмо с логином и паролем.',
  SUCCESS_LOGIN: (login: string) => `Вы успешно вошли под логином ${login}`,
};
