import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import dayjs from 'dayjs'

@Injectable()
export class ErrorLoggerMiddleware implements NestMiddleware {
  logger = new LoggerService();

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, originalUrl, method } = req;

    res.on('close', () => {
      const { statusCode, statusMessage } = res;

      if (statusCode >= 400 && statusCode <= 500) {
        this.logger.error(
          `${dayjs()} - ${method} ${originalUrl} - ${statusCode} ${statusMessage}  - ${ip} \n`
        );
      }
    });

    next();
  }
}
