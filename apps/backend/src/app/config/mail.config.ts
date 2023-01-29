import { getConfigOption } from '@guitar-shop/core';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import {
  ConfigNamespace,
  MAIL_TEMPLATE_FOLDER,
  MailOption,
} from '../app.constant';

const { Mail } = ConfigNamespace;
const { MailFrom, MailHost, MailPort } = MailOption;

export function getMailConfig(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>(getConfigOption(Mail, MailHost)),
        port: configService.get<number>(getConfigOption(Mail, MailPort)),
        secure: false,
      },
      defaults: {
        from: configService.get<string>(getConfigOption(Mail, MailFrom)),
      },
      template: {
        dir: resolve(__dirname, MAIL_TEMPLATE_FOLDER),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  };
}
