import { getMongoDbConnectionString } from '@guitar-shop/core';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigNamespace, MongodbOption } from '../app.constant';

const { Mongodb } = ConfigNamespace;
const { AuthDatabase, DatabaseName, DbHost, Password, DbPort, Username } =
  MongodbOption;

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoDbConnectionString({
        [Username]: configService.get<string>(`${Mongodb}.${Username}`),
        [Password]: configService.get<string>(`${Mongodb}.${Password}`),
        [DbHost]: configService.get<string>(`${Mongodb}.${DbHost}`),
        [DbPort]: configService.get<number>(`${Mongodb}.${DbPort}`),
        [DatabaseName]: configService.get<string>(`${Mongodb}.${DatabaseName}`),
        [AuthDatabase]: configService.get<string>(`${Mongodb}.${AuthDatabase}`),
      }),
    }),
    inject: [ConfigService],
  };
}
