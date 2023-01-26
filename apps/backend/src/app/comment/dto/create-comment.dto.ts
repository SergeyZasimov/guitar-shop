import { CommentField, NewComment, Product, User } from '@guitar-shop/core';
import { IsMongoId, IsNotEmpty, Length, Max, Min } from 'class-validator';
import { COMMENT_CONSTRAINT } from '../comment.constant';

const { RATING, TEXT, ADVANTAGES, DISADVANTAGES } = COMMENT_CONSTRAINT;

// TODO: добавить сообщения об ошибках
export class CreateCommentDto implements NewComment {
  @IsMongoId()
  @IsNotEmpty()
  [CommentField.Author]: User;

  @IsMongoId()
  @IsNotEmpty()
  [CommentField.Product]: Product;

  @Length(ADVANTAGES.MIN, ADVANTAGES.MAX)
  @IsNotEmpty()
  [CommentField.Advantages]: string;

  @Length(DISADVANTAGES.MIN, DISADVANTAGES.MAX)
  @IsNotEmpty()
  [CommentField.Disadvantages]: string;

  @Length(TEXT.MIN, TEXT.MAX)
  @IsNotEmpty()
  [CommentField.Text]: string;

  @Max(RATING.MAX)
  @Min(RATING.MIN)
  @IsNotEmpty()
  [CommentField.Rating]: number;
}
