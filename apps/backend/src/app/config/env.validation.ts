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
  PORT: number;

  @IsString({ message: StringRequired })
  @IsOptional()
  HOST: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MONGO_DB: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MONGO_HOST: string;

  @Min(VALID_PORT.MIN, { message: PortNotValid })
  @Max(VALID_PORT.MAX, { message: PortNotValid })
  @IsInt({ message: IntRequired })
  @IsNotEmpty({ message: Required })
  MONGO_PORT: number;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MONGO_USER: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MONGO_PASSWORD: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MONGO_AUTH_BASE: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  JWT_AT_SECRET: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  JWT_AT_EXPIRES_IN: string;

  @IsEnum(JWT_SIGN_ALGORITHMS, { message: JwtAlgorithmsNotValid })
  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  JWT_SIGN_ALGORITHM: Algorithm;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  UPLOAD_DESTINATION: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  STATIC_DIRECTORY: string;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MAIL_HOST: string;

  @Min(VALID_PORT.MIN, { message: PortNotValid })
  @Max(VALID_PORT.MAX, { message: PortNotValid })
  @IsInt({ message: IntRequired })
  @IsNotEmpty({ message: Required })
  MAIL_PORT: number;

  @IsString({ message: StringRequired })
  @IsNotEmpty({ message: Required })
  MAIL_FROM: string;
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
