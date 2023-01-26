import {
  GuitarType,
  NewProduct,
  ProductField,
  StringsNumber,
} from '@guitar-shop/core';
import { IsEnum, IsNotEmpty, Length, Max, Min } from 'class-validator';
import {
  PRODUCT_CONSTRAINT,
  PRODUCT_VALIDATION_MESSAGE,
} from '../product.constant';

const {
  TITLE_REQUIRED,
  TITLE_LENGTH_NOT_VALID,
  DESCRIPTION_REQUIRED,
  DESCRIPTION_LENGTH_NOT_VALID,
  GUITAR_TYPE_REQUIRED,
  GUITAR_TYPE_NOT_VALID,
  ARTICLE_NOT_VALID,
  ARTICLE_REQUIRED,
  STRINGS_NUMBER_REQUIRED,
  STRINGS_NUMBER_NOT_VALID,
  PRICE_NOT_VALID,
  PRICE_REQUIRED,
} = PRODUCT_VALIDATION_MESSAGE;

const { TITLE, DESCRIPTION, GUITAR_TYPE, ARTICLE, STRINGS_NUMBER, PRICE } =
  PRODUCT_CONSTRAINT;

export class CreateProductDto implements NewProduct {
  @Length(TITLE.MIN, TITLE.MAX, { message: TITLE_LENGTH_NOT_VALID })
  @IsNotEmpty({ message: TITLE_REQUIRED })
  [ProductField.Title]: string;

  @Length(DESCRIPTION.MIN, DESCRIPTION.MAX, {
    message: DESCRIPTION_LENGTH_NOT_VALID,
  })
  @IsNotEmpty({ message: DESCRIPTION_REQUIRED })
  [ProductField.Description]: string;

  @IsEnum(GUITAR_TYPE, { message: GUITAR_TYPE_NOT_VALID })
  @IsNotEmpty({ message: GUITAR_TYPE_REQUIRED })
  [ProductField.GuitarType]: GuitarType;

  @Length(ARTICLE.MIN, ARTICLE.MAX, { message: ARTICLE_NOT_VALID })
  @IsNotEmpty({ message: ARTICLE_REQUIRED })
  [ProductField.Article]: string;

  @IsEnum(STRINGS_NUMBER, { message: STRINGS_NUMBER_NOT_VALID })
  @IsNotEmpty({ message: STRINGS_NUMBER_REQUIRED })
  [ProductField.StringsNumber]: StringsNumber;

  @Max(PRICE.MAX, { message: PRICE_NOT_VALID })
  @Min(PRICE.MIN, { message: PRICE_NOT_VALID })
  @IsNotEmpty({ message: PRICE_REQUIRED })
  [ProductField.Price]: number;
}
