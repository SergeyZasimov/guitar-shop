import { ACCESS_TOKEN_KEY_NAME } from '../app.constant';

export const getToken = (): string => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

export const setToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};
