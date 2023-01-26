import { GuitarType, StringsNumber } from '../constants';

export type Product = {
  _id?: string;
  title: string;
  description: string;
  photo?: string;
  guitarType: GuitarType;
  article: string;
  stringsNumber: StringsNumber;
  price: number;
  totalRating?: number;
  addedAt?: Date;
  commentsCount?: number;
};

export type NewProduct = Pick<
  Product,
  'title' | 'description' | 'guitarType' | 'article' | 'stringsNumber' | 'price'
>;
