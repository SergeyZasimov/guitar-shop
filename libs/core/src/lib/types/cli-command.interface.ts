import { Command } from '../constants';

export interface CliCommand {
  name: Command;

  run(param?: string | number | boolean): void;
}
