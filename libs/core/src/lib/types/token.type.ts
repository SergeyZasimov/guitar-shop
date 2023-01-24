export type TokenPayload = {
  sub: string;
  userName: string;
  email: string;
  role: string;
};

export type TokenResponse = {
  access_token: string;
};
