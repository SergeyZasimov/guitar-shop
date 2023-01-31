import { AuthUser, User } from '@guitar-shop/core';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class AuthUserRdo implements AuthUser {
  @Type(() => UserRdo)
  @Expose()
  user: User;

  @Expose()
  access_token: string;
}
