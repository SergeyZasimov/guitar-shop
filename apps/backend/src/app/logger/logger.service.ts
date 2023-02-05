import { ConsoleLogger, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async error(message: string): Promise<void> {
    if (!existsSync(resolve('logs'))) {
      await mkdir('logs');
    }

    await writeFile(resolve('logs', 'errors.log'), message, {
      encoding: 'utf-8',
      flag: 'a',
    });
  }
}
