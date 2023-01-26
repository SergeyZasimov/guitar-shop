import { User, UserField, UserRole } from '@guitar-shop/core';
import { compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements User {
  [UserField.UserName]: string;
  [UserField.Email]: string;
  [UserField.PasswordHash]: string;
  [UserField.Role]: UserRole;

  constructor(data: User) {
    this.userName = data.userName;
    this.email = data.email;
    this.role = data.role;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    this.passwordHash = await hash(password, SALT_ROUNDS);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }
}
