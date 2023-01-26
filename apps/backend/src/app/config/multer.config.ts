import { getConfigOption } from '@guitar-shop/core';
import { ConfigService } from '@nestjs/config';
import { MulterModuleAsyncOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import nanoid from 'nanoid';
import * as path from 'path';
import { join } from 'path';
import { ConfigNamespace, MulterOption, StaticOption } from '../app.constant';

const { Multer, Static } = ConfigNamespace;
const { Storage } = MulterOption;
const { StaticDirectory } = StaticOption;

export function getMulterConfig(): MulterModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const staticDirectory = configService.get<string>(
        getConfigOption(Static, StaticDirectory)
      );
      const uploadDirectory = configService.get<string>(
        getConfigOption(Multer, Storage)
      );

      return {
        storage: diskStorage({
          destination: join(staticDirectory, uploadDirectory),
          filename: (_req, file, cb) => {
            const filename = nanoid();
            const ext = path.extname(file.originalname);

            cb(null, `${filename}${ext}`);
          },
        }),
      };
    },
    inject: [ConfigService],
  };
}
