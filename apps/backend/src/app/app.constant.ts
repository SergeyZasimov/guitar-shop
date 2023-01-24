export const ENV_FILE_PATH = './environments/.backend.env';

export const VALID_PORT = {
  MIN: 0,
  MAX: 65535,
} as const;

export enum ConfigNamespace {
  Mongodb = 'mongodb',
}

export enum MongodbConfig {
  Username = 'username',
  Password = 'password',
  Host = 'host',
  Port = 'port',
  AuthDatabase = 'authDatabase',
  DatabaseName = 'databaseName',
}

export enum EnvValidationMessage {
  Required = 'required',
  StringRequired = 'must be string',
  IntRequired = 'must be integer',
  PortNotValid = 'port must be between 0 and 65535',
}
