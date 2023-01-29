import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AUTHORIZATION, BACKEND_URL, REQUEST_TIMEOUT } from '../app.constant';
import { getToken } from './token.service';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers[AUTHORIZATION.FIELD] = `${AUTHORIZATION.BEARER} ${token}`;
    }
    return config;
  });

  return api;
};
