import {
  DbCollection,
  GuitarType,
  Product,
  ProductField,
  StringsNumber,
} from '@guitar-shop/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PRODUCT_CONSTRAINT } from './product.constant';

const {
  ARTICLE,
  DESCRIPTION,
  GUITAR_TYPE,
  PRICE,
  STRINGS_NUMBER,
  TITLE,
  PHOTO_TYPE,
  RATING,
} = PRODUCT_CONSTRAINT;

@Schema({
  collection: DbCollection.Products,
  timestamps: true,
})
export class ProductModel extends Document implements Product {
  @Prop({
    required: true,
    minlength: TITLE.MIN,
    maxlength: TITLE.MAX,
  })
  [ProductField.Title]: string;

  @Prop({
    required: true,
    minlength: DESCRIPTION.MIN,
    maxlength: DESCRIPTION.MAX,
  })
  [ProductField.Description]: string;

  @Prop({
    match: PHOTO_TYPE,
    default: '',
  })
  [ProductField.Photo]: string;

  @Prop({
    required: true,
    type: String,
    enum: GUITAR_TYPE,
  })
  [ProductField.GuitarType]: GuitarType;

  @Prop({
    required: true,
    minlength: ARTICLE.MIN,
    maxlength: ARTICLE.MAX,
  })
  [ProductField.Article]: string;

  @Prop({
    required: true,
    type: String,
    enum: STRINGS_NUMBER,
  })
  [ProductField.StringsNumber]: StringsNumber;

  @Prop({
    required: true,
    min: PRICE.MIN,
    max: PRICE.MAX,
  })
  [ProductField.Price]: number;

  @Prop({
    required: false,
    default: 0,
    min: RATING.MIN,
    max: RATING.MAX,
  })
  [ProductField.TotalRating]: number;

  @Prop({
    required: false,
    default: 0,
  })
  [ProductField.CommentsCount]: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
