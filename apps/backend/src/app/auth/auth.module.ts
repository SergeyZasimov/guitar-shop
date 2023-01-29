import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../config/jwt.config';
import { NotifyModule } from '../notify/notify.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local-auth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    NotifyModule,
    JwtModule.registerAsync(getJwtConfig()),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
