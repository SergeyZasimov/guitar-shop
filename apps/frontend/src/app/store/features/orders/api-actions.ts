import { Order, OrderResponse, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types';

const { OrderDomain } = RouteDomain;

export const fetchOrders = createAsyncThunk<
  OrderResponse,
  string,
  AsyncThunkOptionField
>(ActionType.FetchOrders, async (queryString, { extra: api }) => {
  const { data } = await api.get<OrderResponse>(
    `${OrderDomain}?${queryString}`
  );
  return data;
});

export const fetchOrder = createAsyncThunk<
  Order,
  string,
  AsyncThunkOptionField
>(ActionType.FetchOrder, async (orderId, { extra: api }) => {
  const { data } = await api.get<Order>(`${OrderDomain}/${orderId}`);
  return data;
});

export const deleteOrder = createAsyncThunk<
  Order,
  string,
  AsyncThunkOptionField
>(ActionType.DeleteOrder, async (orderId, { extra: api }) => {
  const { data } = await api.delete<Order>(`${OrderDomain}/${orderId}`);
  return data;
});

export const deleteProductFromOrder = createAsyncThunk<
  Order,
  { orderId: string; productId: string },
  AsyncThunkOptionField
>(
  ActionType.DeleteProductFromOrder,
  async ({ orderId, productId }, { extra: api }) => {
    const { data } = await api.patch<Order>(`${OrderDomain}/${orderId}`, {
      productId,
    });
    return data;
  }
);
