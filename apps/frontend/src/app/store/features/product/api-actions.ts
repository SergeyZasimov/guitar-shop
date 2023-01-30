import { Product, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';

const { ProductDomain } = RouteDomain;

export const fetchProducts = createAsyncThunk<
  Product[],
  undefined,
  AsyncThunkOptionField
>('product/fetch', async (_, { extra: api }) => {
  const { data } = await api.get<Product[]>(ProductDomain);
  console.log(data);
  return data;
});
