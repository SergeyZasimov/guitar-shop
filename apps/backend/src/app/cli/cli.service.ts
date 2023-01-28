import { Command } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import minimist from 'minimist';
import { GenerateCommand } from './generate.command';
import { HelpCommand } from './help.command';

@Injectable()
export class CliService {
  constructor(
    private readonly helpCommand: HelpCommand,
    private readonly generateCommand: GenerateCommand
  ) {}

  async execution() {
    const argv = minimist(process.argv.slice(2));
    const [, command] = Object.keys(argv);

    switch (command) {
      case Command.Help:
        this.helpCommand.run();
        break;
      case Command.Generate:
        await this.generateCommand.run(argv[command]);
        break;
      default:
        this.helpCommand.run();
    }
  }
}
