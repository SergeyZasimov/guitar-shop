import { registerAs } from '@nestjs/config';
import { ConfigNamespace, JwtOptions, MongodbOptions } from '../app.constant';

const { Mongodb, Jwt } = ConfigNamespace;
const { AuthDatabase, DatabaseName, Host, Password, Port, Username } =
  MongodbOptions;

const { AccessTokenExpiresIn, AccessTokenSecret, SignAlgorithm } = JwtOptions;

export const mongodbOptions = registerAs(Mongodb, () => ({
  [DatabaseName]: process.env.MONGO_DB,
  [Host]: process.env.MONGO_HOST,
  [Port]: process.env.MONGO_PORT,
  [Username]: process.env.MONGO_USER,
  [Password]: process.env.MONGO_PASSWORD,
  [AuthDatabase]: process.env.MONGO_AUTH_BASE,
}));

export const jwtOptions = registerAs(Jwt, () => ({
  [AccessTokenSecret]: process.env.JWT_AT_SECRET,
  [AccessTokenExpiresIn]: process.env.JWT_AT_EXPIRES_IN,
  [SignAlgorithm]: process.env.JWT_SIGN_ALGORITHM,
}));
