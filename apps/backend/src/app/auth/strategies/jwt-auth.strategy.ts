import { TokenPayload } from '@guitar-shop/core';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigNamespace, JwtOptions } from '../../app.constant';

const { Jwt } = ConfigNamespace;
const { AccessTokenSecret } = JwtOptions;

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(`${Jwt}.${AccessTokenSecret}`),
    });
  }

  public async validate(payload: TokenPayload) {
    return payload;
  }
}
