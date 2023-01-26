export const SALT_ROUNDS = 10;

export const DEFAULT_PASSWORD_HASH = '';

export const USER_CONSTRAINT = {
  USERNAME: {
    MIN: 1,
    MAX: 15,
  },
  PASSWORD: {
    MIN: 6,
    MAX: 12,
  },
};

export const USER_VALIDATION_MESSAGE = {
  USERNAME_REQUIRED: 'Имя пользователя - обязательное поле',
  USERNAME_LENGTH_NOT_VALID: `Имя пользователя должна быть строка длинной от ${USER_CONSTRAINT.USERNAME.MIN} до ${USER_CONSTRAINT.USERNAME.MAX} символов`,
  EMAIL_REQUIRED: 'Email - обязательное поле',
  EMAIL_NOT_VALID: 'Неверный email',
  PASSWORD_REQUIRED: 'Пароль - обязательное поле',
  PASSWORD_LENGTH_NOT_VALID: `Пароль должен быть строкой длинной от ${USER_CONSTRAINT.PASSWORD.MIN} до ${USER_CONSTRAINT.PASSWORD.MAX} символов`,
  ROLE_FORBIDDEN: 'Невозможно установить роль пользователя',
} as const;

export enum UserExceptionMessage {
  Conflict = 'Пользователь с таким email уже существует',
  NotFound = 'Пользователь не найден',
  ForbiddenPassword = 'Неверный пароль',
}
