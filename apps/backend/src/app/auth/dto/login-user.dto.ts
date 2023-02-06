import { LoginUser, UserField } from '@guitar-shop/core';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { USER_VALIDATION_MESSAGE } from '../../user/user.constant';

const { EMAIL_NOT_VALID, EMAIL_REQUIRED } = USER_VALIDATION_MESSAGE;

export class LoginUserDto implements LoginUser {
  [UserField.Email]: string;
  [UserField.Password]: string;
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  @IsNotEmpty({ message: EMAIL_REQUIRED })
  [UserField.Email]: string;
}
