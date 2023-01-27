import { NewUser, UserField } from '@guitar-shop/core';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import {
  USER_CONSTRAINT,
  USER_VALIDATION_MESSAGE,
} from '../../user/user.constant';

const {
  EMAIL_NOT_VALID,
  EMAIL_REQUIRED,
  PASSWORD_LENGTH_NOT_VALID,
  PASSWORD_REQUIRED,
  ROLE_FORBIDDEN,
  USERNAME_LENGTH_NOT_VALID,
  USERNAME_REQUIRED,
} = USER_VALIDATION_MESSAGE;

const { USERNAME, PASSWORD } = USER_CONSTRAINT;

export class CreateUserDto implements NewUser {
  @Length(USERNAME.MIN, USERNAME.MAX, { message: USERNAME_LENGTH_NOT_VALID })
  @IsNotEmpty({ message: USERNAME_REQUIRED })
  [UserField.UserName]: string;

  @IsEmail({}, { message: EMAIL_NOT_VALID })
  @IsNotEmpty({ message: EMAIL_REQUIRED })
  [UserField.Email]: string;

  @Length(PASSWORD.MIN, PASSWORD.MAX, { message: PASSWORD_LENGTH_NOT_VALID })
  @IsNotEmpty({ message: PASSWORD_REQUIRED })
  [UserField.Password]: string;

  @IsEmpty({ message: ROLE_FORBIDDEN })
  @IsOptional()
  [UserField.Role]?: string;
}
