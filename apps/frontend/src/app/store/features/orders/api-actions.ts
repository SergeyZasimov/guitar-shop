import { OrderResponse, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types';

const { OrderDomain } = RouteDomain;

export const fetchOrders = createAsyncThunk<
  OrderResponse,
  string,
  AsyncThunkOptionField
>(ActionType.FetchOrders, async (queryString, { extra: api }) => {
  console.log(queryString);
  const { data } = await api.get<OrderResponse>(`${OrderDomain}?${queryString}`);
  return data;
});
