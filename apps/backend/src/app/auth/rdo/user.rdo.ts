import { ResponseUser, UserRole } from '@guitar-shop/core';
import { Expose, Transform } from 'class-transformer';

export class UserRdo implements ResponseUser {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public userName: string;

  @Expose()
  public email: string;

  @Expose()
  @Transform(({ value }) => value.toString())
  public role: UserRole;
}
