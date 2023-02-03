import {
  CommentResponse,
  NewComment,
  Product,
  ProductsResponse,
  RouteDomain,
} from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types/store.types';

const { ProductDomain, CommentDomain } = RouteDomain;
const { FetchProducts, QueryProducts, FetchProduct } = ActionType;

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  undefined,
  AsyncThunkOptionField
>(FetchProducts, async (_, { extra: api }) => {
  const { data } = await api.get<ProductsResponse>(ProductDomain);
  return data;
});

export const queryProducts = createAsyncThunk<
  ProductsResponse,
  string,
  AsyncThunkOptionField
>(QueryProducts, async (queryString, { extra: api }) => {
  // TODO: log
  // console.log(queryString);
  const { data } = await api.get<ProductsResponse>(
    `${ProductDomain}?${queryString}`
  );
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

export const fetchComments = createAsyncThunk<
  CommentResponse[],
  string,
  AsyncThunkOptionField
>(ActionType.FetchComments, async (productId, { extra: api }) => {
  const { data } = await api.get<CommentResponse[]>(
    `${CommentDomain}/${productId}`
  );
  return data;
});

export const createComment = createAsyncThunk<
  CommentResponse,
  NewComment,
  AsyncThunkOptionField
>(ActionType.CreateComment, async (newComment, { extra: api }) => {
  const { data } = await api.post<CommentResponse>(
    `${CommentDomain}/`,
    newComment
  );
  return data;
});
