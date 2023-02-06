import { User, UserField } from '@guitar-shop/core';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: UserField.Email,
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    await new ValidationPipe({
      expectedType: LoginUserDto,
      transform: true,
    }).transform({ email, password }, { type: 'body' });

    return this.authService.verifyUser(email, password);
  }
}
