import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { CliService } from './cli.service';
import { GenerateCommand } from './generate.command';
import { HelpCommand } from './help.command';

@Module({
  imports: [UserModule, ProductModule],
  providers: [CliService, HelpCommand, GenerateCommand],
})
export class CliModule {}
