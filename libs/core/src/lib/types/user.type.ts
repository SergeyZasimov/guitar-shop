import { UserRole } from '../constants';

export enum UserField {
  _Id = '_id',
  Id = 'id',
  UserName = 'userName',
  Email = 'email',
  PasswordHash = 'passwordHash',
  Password = 'password',
  Role = 'role',
  RegisterAt = 'registerAt',
}

export type User = {
  [UserField._Id]?: string;
  [UserField.UserName]: string;
  [UserField.Email]: string;
  [UserField.PasswordHash]?: string;
  [UserField.Role]?: UserRole;
  [UserField.RegisterAt]?: Date;
};

export type NewUser = {
  [UserField.UserName]: string;
  [UserField.Email]: string;
  [UserField.Password]: string;
};

export type LoginUser = Pick<NewUser, UserField.Email>;

export type ResponseUser = Omit<
  User,
  UserField.PasswordHash | UserField.RegisterAt
>;

export type AuthUser = {
  user: ResponseUser;
  access_token: string;
};
