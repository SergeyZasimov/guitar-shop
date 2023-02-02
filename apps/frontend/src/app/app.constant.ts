import { User } from '@guitar-shop/core';

export const BACKEND_URL = 'http://localhost:3333/api/';

export const REQUEST_TIMEOUT = 5000;

export const ACCESS_TOKEN_KEY_NAME = 'guitar-shop-token';
export const MAX_RATING = 5;
export const COMMENT_LIST_OFFSET = 3;
export const DEFAULT_ADD_TO_CART_QUANTITY = 1;

export const AUTHORIZATION = {
  FIELD: 'Authorization',
  BEARER: 'Bearer',
};

export enum StoreNamespace {
  ProductStore = 'product',
  UserStore = 'user',
  CartStore = 'cart',
  BreadcrumbStore = 'breadcrumb',
}

export const RATING_EXPRESSION = [
  'Нет оценок',
  'Дрова',
  'Плохо',
  'Удовлетворительно',
  'Хорошо',
  'Отлично',
] as const;

export const GUITAR_TYPE_EXPRESSION = {
  acoustic: 'Акустическая гитара',
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
} as const;

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
  SendOrder = 'cart/sendOrder',
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
