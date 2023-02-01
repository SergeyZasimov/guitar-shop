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
  [CommentField.Author]: User | string;
  [CommentField.Product]: string;
  [CommentField.Advantages]: string;
  [CommentField.Disadvantages]: string;
  [CommentField.Text]: string;
  [CommentField.Rating]: number;
  [CommentField.CreatedAt]?: Date;
};

export type NewComment = Omit<
  Comment,
  | CommentField._Id
  | CommentField.CreatedAt
  | CommentField.Product
  | CommentField.Author
>;
