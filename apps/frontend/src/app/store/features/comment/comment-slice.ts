import { Comment } from '@guitar-shop/core';
import { createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { CommentState, State } from '../../../types/store.types';
import { fetchComments } from './api-actions';

const initialState: CommentState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: StoreNamespace.CommentStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.comments = payload;
    });
  },
});

export default commentSlice.reducer;

export const getComments = (state: State): Comment[] =>
  state[StoreNamespace.CommentStore].comments;
