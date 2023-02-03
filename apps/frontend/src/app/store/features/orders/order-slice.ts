import { createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { LoadingStatus, OrderState, State } from '../../../types';
import { fetchOrders } from './api-actions';

const initialState: OrderState = {
  orders: [],
  order: null,
  orderLoadingStatus: LoadingStatus.Idle,
};

export const orderSlice = createSlice({
  name: StoreNamespace.OrderStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });
  },
});

export default orderSlice.reducer;

export const getOrders = (state: State) =>
  state[StoreNamespace.OrderStore].orders;

export const getOrder = (state: State) =>
  state[StoreNamespace.OrderStore].order;

export const getOrderLoadingStatus = (state: State) =>
  state[StoreNamespace.OrderStore].orderLoadingStatus;
