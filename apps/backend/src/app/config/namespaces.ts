import { registerAs } from '@nestjs/config';
import {
  AppOption,
  ConfigNamespace,
  JwtOption,
  MailOption,
  MongodbOption,
  MulterOption,
  StaticOption,
} from '../app.constant';

const { Mongodb, Jwt, Multer, App, Static, Mail } = ConfigNamespace;

const { Host, Port, FrontendDevServerPort } = AppOption;

const { AuthDatabase, DatabaseName, DbHost, Password, DbPort, Username } =
  MongodbOption;

const { AccessTokenExpiresIn, AccessTokenSecret, SignAlgorithm } = JwtOption;

const { Storage } = MulterOption;

const { StaticDirectory } = StaticOption;

const { MailFrom, MailHost, MailPort } = MailOption;

export const appOption = registerAs(App, () => ({
  [Host]: process.env.HOST || 'localhost',
  [Port]: process.env.PORT || 3333,
  [FrontendDevServerPort]: process.env.FRONTEND_DEV_SERVER || 4200,
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

export const mailOptions = registerAs(Mail, () => ({
  [MailHost]: process.env.MAIL_HOST,
  [MailPort]: process.env.MAIL_PORT,
  [MailFrom]: process.env.MAIL_FROM,
}));
