export const DEFAULT_PASSWORD_HASH = '';

export enum UserValidationMessage {
  UserNameRequired = 'Имя пользователя - обязательное поле',
  UserNameLengthNotValid = 'Имя пользователя должна быть строка длинной от 1 до 15 символов',
  EmailRequired = 'Email - обязательное поле',
  EmailNotValid = 'Неверный email',
  PasswordRequired = 'Пароль - обязательное поле',
  PasswordLengthNotValid = 'Пароль должен быть строкой длинной от 6 до 12 символов',
  RoleForbidden = 'Невозможно установить роль пользователя',
}

export enum UserExceptionMessage {
  Conflict = 'Пользователь с таким email уже существует',
  NotFound = 'Пользователь не найден',
  ForbiddenPassword = 'Неверный пароль',
}
