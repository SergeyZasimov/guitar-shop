import { LoginUser, UserField } from '@guitar-shop/core';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  USER_CONSTRAINT,
  USER_VALIDATION_MESSAGE,
} from '../../user/user.constant';

const {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_LENGTH_NOT_VALID,
  PASSWORD_REQUIRED,
} = USER_VALIDATION_MESSAGE;

const { PASSWORD } = USER_CONSTRAINT;

export class LoginUserDto implements LoginUser {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  @IsNotEmpty({ message: EMAIL_REQUIRED })
  [UserField.Email]: string;

  @Length(PASSWORD.MIN, PASSWORD.MAX, { message: PASSWORD_LENGTH_NOT_VALID })
  @IsNotEmpty({ message: PASSWORD_REQUIRED })
  [UserField.Password]: string;
}
