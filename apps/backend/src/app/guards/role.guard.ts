import { UserField } from '@guitar-shop/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FORBIDDEN_MESSAGE } from './guard.constant';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>(
      UserField.Role,
      context.getHandler()
    );

    if (role) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (user.role !== role) {
        throw new ForbiddenException(FORBIDDEN_MESSAGE);
      }
    }

    return true;
  }
}
