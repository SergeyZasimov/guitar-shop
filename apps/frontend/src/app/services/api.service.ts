import { AppError } from '@guitar-shop/core';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import { toast } from 'react-toastify';
import { AUTHORIZATION, BACKEND_URL, REQUEST_TIMEOUT } from '../app.constant';
import { getToken } from './token.service';

const DISPLAY_STATUS_CODE = new Set([
  HttpStatusCode.BadRequest,
  HttpStatusCode.NotFound,
  HttpStatusCode.Conflict,
  HttpStatusCode.Forbidden,
  HttpStatusCode.InternalServerError,
]);

const shouldDisplayError = (response: AxiosResponse) =>
  DISPLAY_STATUS_CODE.has(response.status);

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<AppError>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const { message } = error.response.data;
        if (typeof message === 'string') {
          toast.error(message);
        } else {
          message.forEach((text) => toast.error(text));
        }
      }
      throw new Error(error.response?.statusText);
    }
  );

  return api;
};
