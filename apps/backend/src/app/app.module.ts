import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ENV_FILE_PATH } from './app.constant';
import { AuthModule } from './auth/auth.module';
import { CliModule } from './cli/cli.module';
import { CommentModule } from './comment/comment.module';
import { validateEnvironments } from './config/env.validation';
import { getMailConfig } from './config/mail.config';
import { getMongoDbConfig } from './config/mongodb.config';
import {
  appOption,
  jwtOptions,
  mailOptions,
  mongodbOptions,
  multerOptions,
  staticOptions,
} from './config/namespaces';
import { getStaticConfig } from './config/static.config';
import { LoggerModule } from './logger/logger.module';
import { ErrorLoggerMiddleware } from './middlewares/error-logger.middleware';
import { NotifyModule } from './notify/notify.module';
import { OrderModule } from './order/order.module';
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
        mailOptions,
      ],
      validate: validateEnvironments,
    }),
    ServeStaticModule.forRootAsync(getStaticConfig()),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    MailerModule.forRootAsync(getMailConfig()),
    UserModule,
    AuthModule,
    ProductModule,
    CommentModule,
    CliModule,
    OrderModule,
    NotifyModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorLoggerMiddleware).forRoutes('*');
  }
}
