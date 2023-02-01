import { Product, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types/store.types';

const { ProductDomain } = RouteDomain;
const { FetchProducts, QueryProducts, FetchProduct } = ActionType;

export const fetchProducts = createAsyncThunk<
  Product[],
  undefined,
  AsyncThunkOptionField
>(FetchProducts, async (_, { extra: api }) => {
  const { data } = await api.get<Product[]>(ProductDomain);
  return data;
});

export const queryProducts = createAsyncThunk<
  Product[],
  string,
  AsyncThunkOptionField
>(QueryProducts, async (queryString, { extra: api }) => {
  // TODO: log
  // console.log(queryString);
  const { data } = await api.get<Product[]>(`${ProductDomain}?${queryString}`);
  return data;
});

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  AsyncThunkOptionField
>(FetchProduct, async (productId, { extra: api }) => {
  const { data } = await api.get<Product>(`${ProductDomain}/${productId}`);
  return data;
});