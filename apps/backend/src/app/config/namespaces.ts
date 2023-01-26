import { registerAs } from '@nestjs/config';
import {
  AppOption,
  ConfigNamespace,
  JwtOption,
  MongodbOption,
  MulterOption,
  StaticOption,
} from '../app.constant';

const { Mongodb, Jwt, Multer, App, Static } = ConfigNamespace;

const { Host, Port } = AppOption;

const { AuthDatabase, DatabaseName, DbHost, Password, DbPort, Username } =
  MongodbOption;

const { AccessTokenExpiresIn, AccessTokenSecret, SignAlgorithm } = JwtOption;

const { Storage } = MulterOption;

const { StaticDirectory } = StaticOption;

export const appOption = registerAs(App, () => ({
  [Host]: process.env.HOST || 'localhost',
  [Port]: process.env.PORT || 3333,
}));

export const mongodbOptions = registerAs(Mongodb, () => ({
  [DatabaseName]: process.env.MONGO_DB,
  [DbHost]: process.env.MONGO_HOST,
  [DbPort]: process.env.MONGO_PORT,
  [Username]: process.env.MONGO_USER,
  [Password]: process.env.MONGO_PASSWORD,
  [AuthDatabase]: process.env.MONGO_AUTH_BASE,
}));

export const jwtOptions = registerAs(Jwt, () => ({
  [AccessTokenSecret]: process.env.JWT_AT_SECRET,
  [AccessTokenExpiresIn]: process.env.JWT_AT_EXPIRES_IN,
  [SignAlgorithm]: process.env.JWT_SIGN_ALGORITHM,
}));

export const multerOptions = registerAs(Multer, () => ({
  [Storage]: process.env.UPLOAD_DESTINATION,
}));

export const staticOptions = registerAs(Static, () => ({
  [StaticDirectory]: process.env.STATIC_DIRECTORY,
}));
