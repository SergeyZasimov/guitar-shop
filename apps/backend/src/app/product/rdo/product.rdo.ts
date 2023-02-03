import {
  GuitarType,
  Product,
  ProductField,
  StringsNumber,
} from '@guitar-shop/core';
import { Expose, Transform } from 'class-transformer';

export class ProductRdo implements Product {
  @Expose({ name: ProductField._Id })
  @Transform(({ obj }) => obj._id.toString())
  [ProductField.Id]: string;

  @Expose()
  [ProductField.Title]: string;

  @Expose()
  [ProductField.Description]: string;

  @Expose()
  [ProductField.Photo]: string;

  @Expose()
  @Transform(({ value }) => value.toString())
  [ProductField.GuitarType]: GuitarType;

  @Expose()
  [ProductField.Article]: string;

  @Expose()
  @Transform(({ value }) => value.toString())
  [ProductField.StringsNumber]: StringsNumber;

  @Expose()
  [ProductField.Price]: number;

  @Expose()
  [ProductField.TotalRating]: number;

  @Expose()
  [ProductField.CommentsCount]: number;

  @Expose()
  [ProductField.CreatedAt]: Date;
}
