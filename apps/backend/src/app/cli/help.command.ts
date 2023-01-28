import { CliCommand, Command } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class HelpCommand implements CliCommand {
  readonly name: Command.Help;

  run(): void {
    console.log(
      chalk.underline('Утилита для подготовки данных для REST API сервера')
    );

    console.log(
      chalk.italic(`
    Команды:
        --help                                         # список команд
        --generate <count>                             # генерирует данные, в количестве <count>
    `)
    );
  }
}
