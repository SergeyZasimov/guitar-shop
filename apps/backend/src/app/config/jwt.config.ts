import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import { ConfigNamespace, JwtOptions } from '../app.constant';

const { Jwt } = ConfigNamespace;
const { AccessTokenExpiresIn, AccessTokenSecret, SignAlgorithm } = JwtOptions;

export function getJwtConfig(): JwtModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>(`${Jwt}.${AccessTokenSecret}`),
      signOptions: {
        expiresIn: configService.get<string>(`${Jwt}.${AccessTokenExpiresIn}`),
        algorithm: configService.get<Algorithm>(`${Jwt}.${SignAlgorithm}`),
      },
    }),
    inject: [ConfigService],
  };
}
