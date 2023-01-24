import { GuitarType } from '../constants';

export type Product = {
  _id?: string;
  title: string;
  description: string;
  photo: string;
  guitarType: GuitarType;
  article: number;
  stringsNumber: number;
  Price: number;
  totalRating?: number;
  addedAt?: Date;
  commentsCount?: number;
};
