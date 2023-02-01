import { Product } from '@guitar-shop/core';
import { createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { LoadingStatus, ProductState, State } from '../../../types/store.types';
import { fetchProduct, fetchProducts, queryProducts } from './api-actions';

const initialState: ProductState = {
  products: [],
  product: null,
  status: LoadingStatus.Idle,
  isError: false,
};

export const productSlice = createSlice({
  name: StoreNamespace.ProductStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(queryProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(fetchProduct.fulfilled, (state, { payload }) => {
        state.product = payload;
      });
  },
});

export default productSlice.reducer;

export const getProducts = (state: State): Product[] =>
  state[StoreNamespace.ProductStore].products;

export const getProduct = (state: State): Product | null =>
  state[StoreNamespace.ProductStore].product;
