import { JWT_SIGN_ALGORITHMS } from '@guitar-shop/core';
import chalk from 'chalk';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { Algorithm } from 'jsonwebtoken';
import { EnvValidationMessage, VALID_PORT } from '../app.constant';

const {
  StringRequired,
  Required,
  IntRequired,
  PortNotValid,
  JwtAlgorithmsNotValid,
} = EnvValidationMessage;

class EnvironmentsConfig {
  @Min(VALID_PORT.MIN, { message: PortNotValid })
  @Max(VALID_PORT.MAX, { message: PortNotValid })
  @IsInt({ message: IntRequired })
  @IsOptional()
  public PORT: number;

  @IsString({ message: StringRequired })
  @IsOptional()
  public HOST: string;

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

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public JWT_AT_SECRET: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public JWT_AT_EXPIRES_IN: string;

  @IsEnum(JWT_SIGN_ALGORITHMS, { message: JwtAlgorithmsNotValid })
  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public JWT_SIGN_ALGORITHM: Algorithm;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public UPLOAD_DESTINATION: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  public STATIC_DIRECTORY: string;
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
