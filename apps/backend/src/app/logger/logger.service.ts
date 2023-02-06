import { ConsoleLogger, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { LOG_SETTING } from '../app.constant';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async error(message: string): Promise<void> {
    if (!existsSync(resolve(LOG_SETTING.FOLDER))) {
      await mkdir(LOG_SETTING.FOLDER);
    }

    await writeFile(resolve(LOG_SETTING.FOLDER, LOG_SETTING.ERROR_FILE), message, {
      encoding: 'utf-8',
      flag: 'a',
    });
  }
}
