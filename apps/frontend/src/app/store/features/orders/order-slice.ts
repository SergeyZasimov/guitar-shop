import { Order } from '@guitar-shop/core';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { LoadingStatus, OrderState, State } from '../../../types';
import {
  deleteOrder,
  deleteProductFromOrder,
  fetchOrder,
  fetchOrders,
} from './api-actions';

const initialState: OrderState = {
  orders: [],
  order: null,
  orderLoadingStatus: LoadingStatus.Idle,
  totalOrdersCount: 0,
};

export const orderSlice = createSlice({
  name: StoreNamespace.OrderStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.totalOrdersCount = payload.totalOrdersCount;
      })
      .addCase(fetchOrder.fulfilled, (state, { payload }) => {
        state.order = payload;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, { payload }: PayloadAction<Order>) => {
          state.orders = state.orders.filter(
            (order) => order.id !== payload.id
          );
        }
      )
      .addCase(
        deleteProductFromOrder.fulfilled,
        (state, { payload }: PayloadAction<Order>) => {
          state.order = payload;
        }
      );
  },
});

export default orderSlice.reducer;

export const getOrders = (state: State) =>
  state[StoreNamespace.OrderStore].orders;

export const getOrder = (state: State) =>
  state[StoreNamespace.OrderStore].order;

export const getOrderLoadingStatus = (state: State) =>
  state[StoreNamespace.OrderStore].orderLoadingStatus;

export const getTotalOrdersCount = (state: State) =>
  state[StoreNamespace.OrderStore].totalOrdersCount;
