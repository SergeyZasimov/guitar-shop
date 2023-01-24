import { User } from './user.type';

export type Comment = {
  _id?: string;
  author: User;
  advantages: string;
  disadvantages: string;
  text: string;
  rating: number;
  createdAt?: Date;
};
