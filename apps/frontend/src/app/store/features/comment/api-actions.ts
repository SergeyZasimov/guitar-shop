import { Comment, RouteDomain } from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '../../../app.constant';
import { AsyncThunkOptionField } from '../../../types/store.types';

const { CommentDomain } = RouteDomain;

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  AsyncThunkOptionField
>(ActionType.FetchComments, async (productId, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${CommentDomain}/${productId}`);
  return data;
});
