import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ENV_FILE_PATH } from './app.constant';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './config/env.validation';
import { getMongoDbConfig } from './config/mongodb.config';
import {
  appOption,
  jwtOptions,
  mongodbOptions,
  multerOptions,
  staticOptions,
} from './config/namespaces';
import { getStaticConfig } from './config/static.config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [
        appOption,
        mongodbOptions,
        jwtOptions,
        multerOptions,
        staticOptions,
      ],
      validate: validateEnvironments,
    }),
    ServeStaticModule.forRootAsync(getStaticConfig()),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
