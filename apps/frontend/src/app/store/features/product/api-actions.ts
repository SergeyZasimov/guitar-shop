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
const {
  FetchProducts,
  FetchProduct,
  DeleteProduct,
  CreateProduct,
  UpdateProduct,
} = ActionType;

export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  string,
  AsyncThunkOptionField
>(FetchProducts, async (queryString, { extra: api }) => {
  const { data } = await api.get<ProductsResponse>(
    `${ProductDomain}?${queryString}`
  );
  return data;
});

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  AsyncThunkOptionField
>(DeleteProduct, async (productId, { extra: api }) => {
  const { data } = await api.get<Product>(`${ProductDomain}/${productId}`);
  return data;
});

export const deleteProduct = createAsyncThunk<
  Product,
  string,
  AsyncThunkOptionField
>(FetchProduct, async (productId, { extra: api }) => {
  const { data } = await api.delete<Product>(`${ProductDomain}/${productId}`);
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
