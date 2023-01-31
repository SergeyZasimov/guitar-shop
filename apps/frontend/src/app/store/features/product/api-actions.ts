import { Product, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types/store.types';

const { ProductDomain } = RouteDomain;
const { FetchProducts, SortProducts } = ActionType;

export const fetchProducts = createAsyncThunk<
  Product[],
  undefined,
  AsyncThunkOptionField
>(FetchProducts, async (_, { extra: api }) => {
  const { data } = await api.get<Product[]>(ProductDomain);
  return data;
});

export const sortProducts = createAsyncThunk<
  Product[],
  string,
  AsyncThunkOptionField
>(SortProducts, async (queryString, { extra: api }) => {
  const { data } = await api.get<Product[]>(`${ProductDomain}?${queryString}`);
  return data;
});
