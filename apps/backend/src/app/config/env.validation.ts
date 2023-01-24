import chalk from 'chalk';
import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { EnvValidationMessage, VALID_PORT } from '../app.constant';

const { StringRequired, Required, IntRequired, PortNotValid } =
  EnvValidationMessage;

class EnvironmentsConfig {
  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public MONGO_DB: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public MONGO_HOST: string;

  @Min(VALID_PORT.MIN, { message: PortNotValid })
  @Max(VALID_PORT.MAX, { message: PortNotValid })
  @IsInt({ message: IntRequired })
  @IsNotEmpty({ message: Required })
  public MONGO_PORT: number;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public MONGO_USER: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public MONGO_PASSWORD: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public MONGO_AUTH_BASE: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(EnvironmentsConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentsConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .map((error) => {
        const property = error.property;
        const constraints = Object.values(error.constraints).join(', ');
        return `${property} - ${constraints}`;
      })
      .join('\n');
    throw new Error(chalk.red(`\n${messages}`));
  }

  return environmentsConfig;
}
