import { User, UserRole } from '@guitar-shop/core';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { DEFAULT_PASSWORD_HASH } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

export enum UserExceptionMessage {
  Conflict = 'Пользователь с таким email уже существует',
  NotFound = 'Пользователь не найден',
  ForbiddenPassword = 'Неверный пароль',
}

const { Conflict, NotFound, ForbiddenPassword } = UserExceptionMessage;

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: CreateUserDto): Promise<User> {
    const { userName, email, password } = dto;

    const existUser = await this.userRepository.findOne({ email });

    if (existUser) {
      throw new ConflictException(Conflict);
    }

    const newUser: User = {
      userName,
      email,
      role: UserRole.Customer,
      passwordHash: DEFAULT_PASSWORD_HASH,
    };

    const newUserEntity = await new UserEntity(newUser).setPassword(password);

    return this.userRepository.create(newUserEntity);
  }

  public async login(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;

    const existUser = await this.userRepository.findOne({ email });

    if (!existUser) {
      throw new NotFoundException(NotFound);
    }

    const verify = await new UserEntity(existUser).comparePassword(password);

    if (!verify) {
      throw new ForbiddenException(ForbiddenPassword);
    }

    return existUser;
  }
}
