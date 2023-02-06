export const ENV_FILE_PATH = './environments/.backend.env';

export const VALID_PORT = {
  MIN: 0,
  MAX: 65535,
} as const;

export const LOG_SETTING = {
  FOLDER: 'logs',
  ERROR_FILE: 'errors.log'
} as const;

export const MAIL_TEMPLATE_FOLDER = 'assets';

export enum ConfigNamespace {
  App = 'app',
  Mongodb = 'mongodb',
  Jwt = 'jwt',
  Multer = 'multer',
  Static = 'static',
  Mail = 'mail',
}

export enum AppOption {
  Host = 'host',
  Port = 'port',
}

export enum MongodbOption {
  Username = 'username',
  Password = 'password',
  DbHost = 'host',
  DbPort = 'port',
  AuthDatabase = 'authDatabase',
  DatabaseName = 'databaseName',
}

export enum JwtOption {
  AccessTokenSecret = 'accessTokenSecret',
  AccessTokenExpiresIn = 'accessTokenExpiresIn',
  SignAlgorithm = 'signAlgorithm',
}

export enum MulterOption {
  Storage = 'storage',
}

export enum StaticOption {
  StaticDirectory = 'directory',
}

export enum MailOption {
  MailHost = 'host',
  MailPort = 'port',
  MailFrom = 'from',
}

export enum EnvValidationMessage {
  Required = 'required',
  StringRequired = 'must be string',
  IntRequired = 'must be integer',
  PortNotValid = 'port must be between 0 and 65535',
  JwtAlgorithmsNotValid = 'jwt sign algorithm not supported',
}
