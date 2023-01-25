import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH } from './app.constant';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './config/env.validation';
import { getMongoDbConfig } from './config/mongodb.config';
import { jwtOptions, mongodbOptions } from './config/namespaces';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [mongodbOptions, jwtOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
