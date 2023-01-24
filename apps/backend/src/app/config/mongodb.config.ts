import { getMongoDbConnectionString } from '@guitar-shop/core';
import { ConfigService } from '@nestjs/config/dist';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigNamespace, MongodbConfig } from '../app.constant';

const { Mongodb } = ConfigNamespace;
const { AuthDatabase, DatabaseName, Host, Password, Port, Username } =
  MongodbConfig;

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoDbConnectionString({
        [Username]: configService.get<string>(`${Mongodb}.${Username}`),
        [Password]: configService.get<string>(`${Mongodb}.${Password}`),
        [Host]: configService.get<string>(`${Mongodb}.${Host}`),
        [Port]: configService.get<number>(`${Mongodb}.${Port}`),
        [DatabaseName]: configService.get<string>(`${Mongodb}.${DatabaseName}`),
        [AuthDatabase]: configService.get<string>(`${Mongodb}.${AuthDatabase}`),
      }),
    }),
    inject: [ConfigService],
  };
}
