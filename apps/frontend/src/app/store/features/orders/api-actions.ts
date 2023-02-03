import { Order, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types';

const { OrderDomain } = RouteDomain;

export const fetchOrders = createAsyncThunk<
  Order[],
  string,
  AsyncThunkOptionField
>(ActionType.FetchOrders, async (queryString, { extra: api }) => {
  const { data } = await api.get<Order[]>(`${OrderDomain}?${queryString}`);
  return data;
});
