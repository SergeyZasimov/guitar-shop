import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './config/env.validation';
import { getMongoDbConfig } from './config/mongodb.config';
import { mongodbOptions } from './config/namespaces';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongodbOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
