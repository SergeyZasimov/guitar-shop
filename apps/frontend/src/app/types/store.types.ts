import { Product, User } from '@guitar-shop/core';
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
  status: LoadingStatus;
  isError: boolean;
};

export type UserState = {
  user: User | null;
  status: LoadingStatus;
  error: string;
};
