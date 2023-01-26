import { Product } from './product.type';
import { User } from './user.type';

export enum CommentField {
  _Id = '_id',
  Id = 'id',
  Author = 'author',
  Product = 'product',
  Advantages = 'advantages',
  Disadvantages = 'disadvantages',
  Text = 'text',
  Rating = 'rating',
  CratedAt = 'createdAt',
}

export type Comment = {
  [CommentField._Id]?: string;
  [CommentField.Author]: User;
  [CommentField.Product]: Product;
  [CommentField.Advantages]: string;
  [CommentField.Disadvantages]: string;
  [CommentField.Text]: string;
  [CommentField.Rating]: number;
  [CommentField.CratedAt]?: Date;
};
