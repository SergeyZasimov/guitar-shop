import { User } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

const USERNAME_FIELD = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: USERNAME_FIELD,
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.verifyUser(email, password);
  }
}
