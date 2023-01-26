import { getConfigOption } from '@guitar-shop/core';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigNamespace, MulterOption, StaticOption } from '../app.constant';

const { Static, Multer } = ConfigNamespace;
const { StaticDirectory } = StaticOption;
const { Storage } = MulterOption;

export function getStaticConfig(): ServeStaticModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const staticDirectory = configService.get<string>(
        getConfigOption(Static, StaticDirectory)
      );

      const uploadDirectory = configService.get<string>(
        getConfigOption(Multer, Storage)
      );

      return [
        {
          rootPath: join(
            __dirname,
            '..',
            '..',
            '..',
            staticDirectory,
            uploadDirectory
          ),
          serveStaticOptions: {
            index: false,
          },
        },
      ];
    },
    inject: [ConfigService],
  };
}
