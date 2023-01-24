import { LoginUser } from '@guitar-shop/core';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserValidationMessage } from '../auth.constant';

const {
  EmailRequired,
  EmailNotValid,
  PasswordRequired,
  PasswordLengthNotValid,
} = UserValidationMessage;

export class LoginUserDto implements LoginUser {
  @IsEmail({}, { message: EmailNotValid })
  @IsNotEmpty({ message: EmailRequired })
  public email: string;

  @Length(6, 12, { message: PasswordLengthNotValid })
  @IsNotEmpty({ message: PasswordRequired })
  public password: string;
}
