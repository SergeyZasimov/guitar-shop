import { RequestWithUser } from '@guitar-shop/core';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (property: string | undefined, context: ExecutionContext) => {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!property) {
      return request.user;
    }

    return request.user[property];
  }
);
