export type TokenPayload = {
  sub: string;
  userName: string;
  email: string;
  role: string;
};

export type AccessToken = {
  access_token: string;
};
