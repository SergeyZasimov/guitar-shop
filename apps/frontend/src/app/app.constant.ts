import { User } from '@guitar-shop/core';

export const BACKEND_URL = 'http://localhost:3333/api/';

export const REQUEST_TIMEOUT = 5000;

export const ACCESS_TOKEN_KEY_NAME = 'guitar-shop-token';
export const MAX_RATING = 5;
export const DEFAULT_COMMENTS_COUNT = 3;

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

export const RATING_EXPRESSION = [
  'Нет оценок',
  'Дрова',
  'Плохо',
  'Удовлетворительно',
  'Хорошо',
  'Отлично',
] as const;

export enum ActionType {
  RedirectBack = 'app/redirectBack',
  FetchProducts = 'product/fetchProducts',
  FetchProduct = 'product/fetchProduct',
  QueryProducts = 'product/query',
  RegisterUser = 'user/register',
  LoginUser = 'user/login',
  CheckUser = 'user/checkStatus',
  FetchComments = 'comment/fetchComments',
  CreateComment = 'comment/createComments',
}

export enum AppRoute {
  Root = '/',
  Register = '/register',
  Login = '/login',
  Cart = '/cart',
  Product = '/product',
}

export const INITIAL_USER_STATE: User = {
  userName: '',
  email: '',
};

export enum RatingStarsLocation {
  Catalog = 'catalog',
  Product = 'product',
  Comment = 'comment',
}

export enum ModalClass {
  CartAdd = 'modal-cart--add',
  CartDelete = 'modal-cart--delete',
  SuccessAdd = 'modal-success--add',
  SuccessReview = 'modal-success--review',
  SuccessSend = 'modal-success--send',
  Review = 'modal-review',
  Enter = 'modal-enter',
}

export const SUCCESS_MESSAGE = {
  SUCCESS_REGISTER:
    'Вы успешно зарегистрировались. На почту выслано письмо с логином и паролем.',
  SUCCESS_LOGIN: (login: string) => `Вы успешно вошли под логином ${login}`,
};

export const ERROR_MESSAGE = {
  UNAUTHORIZED: 'Вы не авторизированы',
};
