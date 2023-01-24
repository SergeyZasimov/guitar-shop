import { Request } from 'express';
import { User } from './user.type';

export type RequestWithUser = Request & { user: User };
