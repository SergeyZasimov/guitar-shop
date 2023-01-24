export const ENV_FILE_PATH = './environments/.backend.env';

export const VALID_PORT = {
  MIN: 0,
  MAX: 65535,
} as const;

export enum ConfigNamespace {
  Mongodb = 'mongodb',
  Jwt = 'jwt',
}

export enum MongodbOptions {
  Username = 'username',
  Password = 'password',
  Host = 'host',
  Port = 'port',
  AuthDatabase = 'authDatabase',
  DatabaseName = 'databaseName',
}

export enum JwtOptions {
  AccessTokenSecret = 'accessTokenSecret',
  AccessTokenExpiresIn = 'accessTokenExpiresIn',
  SignAlgorithm = 'signAlgorithm',
}

export enum EnvValidationMessage {
  Required = 'required',
  StringRequired = 'must be string',
  IntRequired = 'must be integer',
  PortNotValid = 'port must be between 0 and 65535',
  JwtAlgorithmsNotValid = 'jwt sign algorithm not supported',
}
