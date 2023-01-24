import { NewUser } from '@guitar-shop/core';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { UserValidationMessage } from '../auth.constant';

const {
  UserNameRequired,
  UserNameLengthNotValid,
  EmailRequired,
  EmailNotValid,
  PasswordRequired,
  PasswordLengthNotValid,
  RoleForbidden,
} = UserValidationMessage;

export class CreateUserDto implements NewUser {
  @Length(1, 15, { message: UserNameLengthNotValid })
  @IsNotEmpty({ message: UserNameRequired })
  public userName: string;

  @IsEmail({}, { message: EmailNotValid })
  @IsNotEmpty({ message: EmailRequired })
  public email: string;

  @Length(6, 12, { message: PasswordLengthNotValid })
  @IsNotEmpty({ message: PasswordRequired })
  public password: string;

  @IsEmpty({ message: RoleForbidden })
  @IsOptional()
  public role: string;
}
