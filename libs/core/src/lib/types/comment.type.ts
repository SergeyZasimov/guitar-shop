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
  CreatedAt = 'createdAt',
}

export type Comment = {
  [CommentField._Id]?: string;
  [CommentField.Id]?: string;
  [CommentField.Author]: string;
  [CommentField.Product]: string;
  [CommentField.Advantages]: string;
  [CommentField.Disadvantages]: string;
  [CommentField.Text]: string;
  [CommentField.Rating]: number;
  [CommentField.CreatedAt]?: Date;
};

export type NewComment = Omit<
  Comment,
  CommentField._Id | CommentField.Id | CommentField.CreatedAt | CommentField.Author
>;

export type CommentResponse = {
  [CommentField.Id]: string;
  [CommentField.Author]: User;
  [CommentField.Product]: Product;
  [CommentField.Advantages]: string;
  [CommentField.Disadvantages]: string;
  [CommentField.Text]: string;
  [CommentField.Rating]: number;
  [CommentField.CreatedAt]: Date;
};
