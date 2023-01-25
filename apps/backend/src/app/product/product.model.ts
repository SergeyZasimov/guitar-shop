import { GuitarType, Product, StringsNumber } from '@guitar-shop/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PRODUCT_CONSTRAINT } from './product.constant';

const { ARTICLE, DESCRIPTION, GUITAR_TYPE, PRICE, STRINGS_NUMBER, TITLE } =
  PRODUCT_CONSTRAINT;

@Schema({
  collection: 'products',
  timestamps: true,
})
export class ProductModel extends Document implements Product {
  @Prop({
    required: true,
    minlength: TITLE.MIN,
    maxlength: TITLE.MAX,
  })
  public title: string;

  @Prop({
    required: true,
    minlength: DESCRIPTION.MIN,
    maxlength: DESCRIPTION.MAX,
  })
  public description: string;

  @Prop({
    required: true,
    match: /[\w/-]+.(jpg|png|jpeg)$/,
  })
  public photo: string;

  @Prop({
    required: true,
    type: String,
    enum: GUITAR_TYPE,
  })
  public guitarType: GuitarType;

  @Prop({
    required: true,
    minlength: ARTICLE.MIN,
    maxlength: ARTICLE.MAX,
  })
  public article: string;

  @Prop({
    required: true,
    type: String,
    enum: STRINGS_NUMBER,
  })
  public stringsNumber: StringsNumber;

  @Prop({
    required: true,
    min: PRICE.MIN,
    max: PRICE.MAX,
  })
  public price: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
