import { TokenPayload, TokenResponse, User, UserRole } from '@guitar-shop/core';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotifyService } from '../notify/notify.service';
import {
  DEFAULT_PASSWORD_HASH,
  UserExceptionMessage,
} from '../user/user.constant';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

const { Conflict, NotFound, ForbiddenPassword } = UserExceptionMessage;

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly notifyService: NotifyService
  ) {}

  public async register(dto: CreateUserDto): Promise<User> {
    const { userName, email, password } = dto;

    const existUser = await this.userRepository.findOne({ email });

    if (existUser) {
      throw new ConflictException(Conflict);
    }

    const newUserEntity = await new UserEntity({
      userName,
      email,
      role: UserRole.Customer,
      passwordHash: DEFAULT_PASSWORD_HASH,
    }).setPassword(password);

    const newUser = await this.userRepository.create(newUserEntity);

    if (newUser) {
      await this.notifyService.sendRegisterNotify(newUser, password);
    }

    return newUser;
  }

  public async login(user: User): Promise<TokenResponse> {
    const { _id, userName, email, role } = user;

    const payload: TokenPayload = {
      sub: _id,
      userName,
      email,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }

  public async getUser(email: string): Promise<User | null> {
    return this.checkUserExist(email);
  }

  public async verifyUser(email: string, password: string): Promise<User> {
    const existUser = await this.checkUserExist(email);
    const verify = await new UserEntity(existUser).comparePassword(password);

    if (!verify) {
      throw new ForbiddenException(ForbiddenPassword);
    }

    return existUser;
  }

  private async checkUserExist(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException(NotFound);
    }

    return user;
  }
}
