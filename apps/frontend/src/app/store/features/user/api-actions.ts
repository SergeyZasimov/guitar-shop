import {
  AuthUser,
  LoginUser,
  NewUser,
  ResponseUser,
  RouteDomain,
  RoutePath,
  User,
} from '@guitar-shop/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ActionType, SUCCESS_MESSAGE } from '../../../app.constant';
import { setToken } from '../../../services/token.service';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { AppRoute } from '../../../utils';
import {
  redirectBack,
  redirectToRoute,
} from '../../middlewares/reditect.action';

const { Auth } = RouteDomain;
const { Register, Login, CheckStatus } = RoutePath;

export const registerUser = createAsyncThunk<
  User,
  NewUser,
  AsyncThunkOptionField
>(ActionType.RegisterUser, async (newUser, { dispatch, extra: api }) => {
  const { data } = await api.post<User>(`${Auth}/${Register}`, newUser);
  toast.success(SUCCESS_MESSAGE.SUCCESS_REGISTER);
  dispatch(redirectToRoute(AppRoute.Root));
  return data;
});

export const loginUser = createAsyncThunk<
  ResponseUser,
  LoginUser,
  AsyncThunkOptionField
>(ActionType.LoginUser, async (authUser, { dispatch, extra: api }) => {
  const {
    data: { user, access_token },
  } = await api.post<AuthUser>(`${Auth}/${Login}`, authUser);
  setToken(access_token);
  toast.success(SUCCESS_MESSAGE.SUCCESS_LOGIN(user.email));
  dispatch(redirectBack());
  return user;
});

export const checkUser = createAsyncThunk<
  ResponseUser,
  undefined,
  AsyncThunkOptionField
>(ActionType.CheckUser, async (_, { extra: api }) => {
  const { data } = await api.get<ResponseUser>(`${Auth}/${CheckStatus}`);
  toast.success(SUCCESS_MESSAGE.SUCCESS_LOGIN(data.email));
  return data;
});
