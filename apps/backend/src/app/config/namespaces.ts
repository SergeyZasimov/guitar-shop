import { registerAs } from '@nestjs/config';
import { ConfigNamespace, MongodbConfig } from '../app.constant';

const { Mongodb } = ConfigNamespace;
const { AuthDatabase, DatabaseName, Host, Password, Port, Username } =
  MongodbConfig;

export const mongodbOptions = registerAs(Mongodb, () => ({
  [DatabaseName]: process.env.MONGO_DB,
  [Host]: process.env.MONGO_HOST,
  [Port]: process.env.MONGO_PORT,
  [Username]: process.env.MONGO_USER,
  [Password]: process.env.MONGO_PASSWORD,
  [AuthDatabase]: process.env.MONGO_AUTH_BASE,
}));
