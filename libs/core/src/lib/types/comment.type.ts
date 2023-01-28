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
  [CommentField.Author]: string;
  [CommentField.Product]: string;
  [CommentField.Advantages]: string;
  [CommentField.Disadvantages]: string;
  [CommentField.Text]: string;
  [CommentField.Rating]: number;
  [CommentField.CratedAt]?: Date;
};

export type NewComment = Omit<
  Comment,
  CommentField._Id | CommentField.CratedAt | CommentField.Product
>;
