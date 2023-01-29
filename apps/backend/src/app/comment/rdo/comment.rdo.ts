import { Comment, CommentField } from '@guitar-shop/core';
import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { ProductRdo } from '../../product/rdo/product.rdo';

export class CommentRdo implements Comment {
  @Expose({ name: CommentField._Id })
  @Transform(({ obj }) => obj._id.toString())
  [CommentField.Id]: string;

  @Expose()
  @Type(() => UserRdo)
  [CommentField.Author]: string;

  @Expose()
  @Type(() => ProductRdo)
  [CommentField.Product]: string;

  @Expose()
  [CommentField.Advantages]: string;

  @Expose()
  [CommentField.Disadvantages]: string;

  @Expose()
  [CommentField.Text]: string;

  @Expose()
  [CommentField.Rating]: number;

  @Expose()
  [CommentField.CreatedAt]: Date;
}
