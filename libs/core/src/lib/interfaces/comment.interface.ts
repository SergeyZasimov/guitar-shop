import { User } from './user.interface';

export interface Comment {
  _id?: string;
  author: User;
  advantages: string;
  disadvantages: string;
  text: string;
  rating: number;
  createdAt?: Date;
}
