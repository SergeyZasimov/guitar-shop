import {
  RequestUser,
  RouteDomain,
  RoutePath,
  User,
  fillObject,
} from '@guitar-shop/core';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserRdo } from './rdo/user.rdo';

const { Auth } = RouteDomain;
const { Register, Login, CheckStatus } = RoutePath;

@Controller(Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Register)
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post(Login)
  public async login(@GetCurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(CheckStatus)
  public getUser(@GetCurrentUser(RequestUser.Email) email: string) {
    const user = this.authService.getUser(email);
    return fillObject(UserRdo, user);
  }
}
