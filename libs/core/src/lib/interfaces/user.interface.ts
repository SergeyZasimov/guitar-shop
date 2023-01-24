import { UserRole } from '../constants';

export interface User {
  _id?: string;
  userName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  registerAt?: Date;
}
