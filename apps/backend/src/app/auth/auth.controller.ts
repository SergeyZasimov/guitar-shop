import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
}
