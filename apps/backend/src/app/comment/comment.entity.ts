import { Comment, CommentField, Product, User } from '@guitar-shop/core';

export class CommentEntity implements Comment {
  [CommentField.Author]: User;
  [CommentField.Product]: Product;
  [CommentField.Advantages]: string;
  [CommentField.Disadvantages]: string;
  [CommentField.Text]: string;
  [CommentField.Rating]: number;

  constructor(data: Comment) {
    this.author = data.author;
    this.product = data.product;
    this.advantages = data.advantages;
    this.disadvantages = data.disadvantages;
    this.text = data.text;
    this.rating = data.rating;
  }
}
