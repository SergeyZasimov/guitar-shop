import { User } from '@guitar-shop/core';
import { createSlice } from '@reduxjs/toolkit';
import { StoreNamespace } from '../../../app.constant';
import { LoadingStatus, State, UserState } from '../../../types/store.types';
import { checkUser, loginUser, registerUser } from './api-actions';

const initialState: UserState = {
  user: null,
  requestStatus: LoadingStatus.Idle,
};

export const userSlice = createSlice({
  name: StoreNamespace.UserStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.requestStatus === LoadingStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.requestStatus === LoadingStatus.Succeeded;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus === LoadingStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.requestStatus === LoadingStatus.Succeeded;
      })
      .addCase(checkUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export default userSlice.reducer;

export const getUser = (state: State): User | null =>
  state[StoreNamespace.UserStore].user;

export const getUserRequestStatus = (state: State): LoadingStatus =>
  state[StoreNamespace.UserStore].requestStatus;
