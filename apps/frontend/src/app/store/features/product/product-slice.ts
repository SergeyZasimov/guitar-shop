import { CommentResponse, Product } from '@guitar-shop/core';
import { createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { LoadingStatus, ProductState, State } from '../../../types/store.types';
import {
  createComment,
  fetchComments,
  fetchProduct,
  fetchProducts,
  queryProducts,
} from './api-actions';

const initialState: ProductState = {
  products: [],
  product: null,
  productLoadingStatus: LoadingStatus.Idle,
  commentLoadingStatus: LoadingStatus.Idle,
  isError: false,
  comments: [],
  totalProductsCount: 0,
  minPrice: 0,
  maxPrice: 0,
};

export const productSlice = createSlice({
  name: StoreNamespace.ProductStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProductsCount = payload.totalProductsCount;
        state.minPrice = payload.minPrice;
        state.maxPrice = payload.maxPrice;
        state.productLoadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(queryProducts.pending, (state) => {
        state.productLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(queryProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProductsCount = payload.totalProductsCount;
        state.productLoadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.productLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchProduct.fulfilled, (state, { payload }) => {
        state.product = payload;
        state.productLoadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentLoadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.commentLoadingStatus = LoadingStatus.Succeeded;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.comments.unshift(payload);
      });
  },
});

export default productSlice.reducer;

export const getProducts = (state: State): Product[] =>
  state[StoreNamespace.ProductStore].products;

export const getProduct = (state: State): Product | null =>
  state[StoreNamespace.ProductStore].product;

export const getComments = (state: State): CommentResponse[] =>
  state[StoreNamespace.ProductStore].comments;

export const getProductLoadingStatus = (state: State): LoadingStatus =>
  state[StoreNamespace.ProductStore].productLoadingStatus;

export const getCommentLoadingStatus = (state: State): LoadingStatus =>
  state[StoreNamespace.ProductStore].commentLoadingStatus;

export const getMinProductPrice = (state: State): number =>
  state[StoreNamespace.ProductStore].minPrice;

export const getMaxProductPrice = (state: State): number =>
  state[StoreNamespace.ProductStore].maxPrice;

export const getTotalProductsCount = (state: State): number =>
  state[StoreNamespace.ProductStore].totalProductsCount;
