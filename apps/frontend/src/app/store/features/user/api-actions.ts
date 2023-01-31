import {
  LoginUser,
  NewUser,
  RouteDomain,
  RoutePath,
  TokenResponse,
  User,
} from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ActionType, SUCCESS_MESSAGE } from '../../../app.constant';
import { setToken } from '../../../services/token.service';
import { AsyncThunkOptionField } from '../../../types/store.types';

const { Auth } = RouteDomain;
const { Register, Login } = RoutePath;

export const registerUser = createAsyncThunk<
  User,
  NewUser,
  AsyncThunkOptionField
>(ActionType.RegisterUser, async (newUser, { extra: api }) => {
  const { data } = await api.post<User>(`${Auth}/${Register}`, newUser);
  toast.success(SUCCESS_MESSAGE.SUCCESS_REGISTER);
  return data;
});

export const loginUser = createAsyncThunk<
  void,
  LoginUser,
  AsyncThunkOptionField
>(ActionType.LoginUser, async (user, { extra: api }) => {
  const {
    data: { access_token },
  } = await api.post<TokenResponse>(`${Auth}/${Login}`, user);
  setToken(access_token);
  toast.success(SUCCESS_MESSAGE.SUCCESS_LOGIN(user.email));
});

// john smith
// test@user.com
// secret
