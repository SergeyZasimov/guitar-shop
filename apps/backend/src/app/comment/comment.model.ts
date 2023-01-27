import {
  Comment,
  CommentField,
  DbCollection,
  Product,
  User,
} from '@guitar-shop/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { UserModel } from '../user/user.model';
import { COMMENT_CONSTRAINT } from './comment.constant';

const { ADVANTAGES, DISADVANTAGES, RATING, TEXT } = COMMENT_CONSTRAINT;

@Schema({
  collection: DbCollection.Comments,
  timestamps: true,
})
export class CommentModel extends Document implements Comment {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserModel.name,
  })
  [CommentField.Author]: User;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ProductModel.name,
  })
  [CommentField.Product]: Product;

  @Prop({
    required: true,
    minlength: ADVANTAGES.MIN,
    maxlength: ADVANTAGES.MAX,
  })
  [CommentField.Advantages]: string;

  @Prop({
    required: true,
    minlength: DISADVANTAGES.MIN,
    maxlength: DISADVANTAGES.MAX,
  })
  [CommentField.Disadvantages]: string;

  @Prop({
    required: true,
    minlength: TEXT.MIN,
    maxlength: TEXT.MAX,
  })
  [CommentField.Text]: string;

  @Prop({
    required: true,
    minlength: RATING.MIN,
    maxlength: RATING.MAX,
  })
  [CommentField.Rating]: number;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
