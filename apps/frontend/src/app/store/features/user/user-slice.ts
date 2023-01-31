import { User } from '@guitar-shop/core';
import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_STATE, StoreNamespace } from '../../../app.constant';
import { LoadingStatus, State, UserState } from '../../../types/store.types';

const initialState: UserState = {
  user: INITIAL_USER_STATE,
  status: LoadingStatus.Idle,
  error: '',
};

export const userSlice = createSlice({
  name: StoreNamespace.UserStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;

export const getUser = (state: State): User =>
  state[StoreNamespace.UserStore].user;
