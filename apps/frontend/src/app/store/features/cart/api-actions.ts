import { NewOrder, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types';

const { OrderDomain } = RouteDomain;

export const sendOrder = createAsyncThunk<
  void,
  NewOrder,
  AsyncThunkOptionField
>(ActionType.SendOrder, async (customerOrder, { extra: api }) => {
  await api.post<void>(`${OrderDomain}`, customerOrder);
});
