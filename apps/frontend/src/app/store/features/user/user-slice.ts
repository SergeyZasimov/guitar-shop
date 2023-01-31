import { User } from '@guitar-shop/core';
import { createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { LoadingStatus, State, UserState } from '../../../types/store.types';
import { checkUser, loginUser } from './api-actions';

const initialState: UserState = {
  user: null,
  status: LoadingStatus.Idle,
  error: '',
};

export const userSlice = createSlice({
  name: StoreNamespace.UserStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(checkUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export default userSlice.reducer;

export const getUser = (state: State): User | null =>
  state[StoreNamespace.UserStore].user;
