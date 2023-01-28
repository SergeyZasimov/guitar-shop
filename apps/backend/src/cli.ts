import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CliModule } from './app/cli/cli.module';
import { CliService } from './app/cli/cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  await app.select(CliModule).get(CliService, { strict: true }).execution();
  await app.close();
}

bootstrap();
