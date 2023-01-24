import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './config/env.validation';
import { getMongoDbConfig } from './config/mongodb.config';
import { mongodbOptions } from './config/namespaces';
import { UserModule } from './user/user.module';

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
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
