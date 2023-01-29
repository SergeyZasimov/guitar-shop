import { UserField } from '@guitar-shop/core';
import { SetMetadata } from '@nestjs/common';

export const Role = (role: string) => SetMetadata(UserField.Role, role);
