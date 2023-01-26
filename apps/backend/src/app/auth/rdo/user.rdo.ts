import { ResponseUser, UserField, UserRole } from '@guitar-shop/core';
import { Expose, Transform } from 'class-transformer';

export class UserRdo implements ResponseUser {
  @Expose({ name: UserField._Id })
  @Transform(({ obj }) => obj._id.toString())
  [UserField.Id]: string;

  @Expose()
  [UserField.UserName]: string;

  @Expose()
  [UserField.Email]: string;

  @Expose()
  @Transform(({ value }) => value.toString())
  [UserField.Role]: UserRole;
}
