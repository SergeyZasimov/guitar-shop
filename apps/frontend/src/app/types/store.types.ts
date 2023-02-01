import { CommentResponse, Product, User } from '@guitar-shop/core';
import { AxiosInstance } from 'axios';
import { store } from '../store';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AsyncThunkOptionField = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export type ProductState = {
  products: Product[];
  product: Product | null;
  status: LoadingStatus;
  isError: boolean;
  comments: CommentResponse[];
};

export type UserState = {
  user: User | null;
  status: LoadingStatus;
  error: string;
};

export type CommentState = {
  comments: CommentResponse[];
};
