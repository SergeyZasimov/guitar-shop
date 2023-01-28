import {
  GuitarType,
  NewProduct,
  ProductField,
  StringsNumber,
} from '@guitar-shop/core';
import { IsEnum, Length, Max, Min } from 'class-validator';
import {
  PRODUCT_CONSTRAINT,
  PRODUCT_VALIDATION_MESSAGE,
} from '../product.constant';

const {
  TITLE_LENGTH_NOT_VALID,
  DESCRIPTION_LENGTH_NOT_VALID,
  GUITAR_TYPE_NOT_VALID,
  ARTICLE_NOT_VALID,
  STRINGS_NUMBER_NOT_VALID,
  PRICE_NOT_VALID,
} = PRODUCT_VALIDATION_MESSAGE;

const { TITLE, DESCRIPTION, GUITAR_TYPE, ARTICLE, STRINGS_NUMBER, PRICE } =
  PRODUCT_CONSTRAINT;

export class UpdateProductDto implements Partial<NewProduct> {
  @Length(TITLE.MIN, TITLE.MAX, { message: TITLE_LENGTH_NOT_VALID })
  [ProductField.Title]?: string;

  @Length(DESCRIPTION.MIN, DESCRIPTION.MAX, {
    message: DESCRIPTION_LENGTH_NOT_VALID,
  })
  [ProductField.Description]?: string;

  @IsEnum(GUITAR_TYPE, { message: GUITAR_TYPE_NOT_VALID })
  [ProductField.GuitarType]?: GuitarType;

  @Length(ARTICLE.MIN, ARTICLE.MAX, { message: ARTICLE_NOT_VALID })
  [ProductField.Article]?: string;

  @IsEnum(STRINGS_NUMBER, { message: STRINGS_NUMBER_NOT_VALID })
  [ProductField.StringsNumber]?: StringsNumber;

  @Max(PRICE.MAX, { message: PRICE_NOT_VALID })
  @Min(PRICE.MIN, { message: PRICE_NOT_VALID })
  [ProductField.Price]?: number;
}
