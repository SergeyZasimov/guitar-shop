import { UserRole } from '../constants';

export type User = {
  _id?: string;
  userName: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  registerAt?: Date;
};

export type NewUser = {
  userName: string;
  email: string;
  password: string;
};

export type LoginUser = Omit<NewUser, 'userName'>;

export type ResponseUser = Omit<User, 'passwordHash' | 'registerAt'>;
