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
  FetchProducts = 'product/fetch',
  QueryProducts = 'product/query',
}
