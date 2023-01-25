import { GuitarType, NewProduct, StringsNumber } from '@guitar-shop/core';
import { IsEnum, IsNotEmpty, Length, Matches, Max, Min } from 'class-validator';
import {
  PRODUCT_CONSTRAINT,
  PRODUCT_VALIDATION_MESSAGE,
} from '../product.constant';

const {
  TITLE_REQUIRED,
  TITLE_LENGTH_NOT_VALID,
  DESCRIPTION_REQUIRED,
  DESCRIPTION_LENGTH_NOT_VALID,
  PHOTO_REQUIRED,
  PHOTO_NOT_VALID,
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
  public title: string;

  @Length(DESCRIPTION.MIN, DESCRIPTION.MAX, {
    message: DESCRIPTION_LENGTH_NOT_VALID,
  })
  @IsNotEmpty({ message: DESCRIPTION_REQUIRED })
  public description: string;

  @Matches(/[\w/-]+.(jpg|png|jpeg)$/, {
    message: PHOTO_NOT_VALID,
  })
  @IsNotEmpty({ message: PHOTO_REQUIRED })
  public photo: string;

  @IsEnum(GUITAR_TYPE, { message: GUITAR_TYPE_NOT_VALID })
  @IsNotEmpty({ message: GUITAR_TYPE_REQUIRED })
  public guitarType: GuitarType;

  @Length(ARTICLE.MIN, ARTICLE.MAX, { message: ARTICLE_NOT_VALID })
  @IsNotEmpty({ message: ARTICLE_REQUIRED })
  public article: string;

  @IsEnum(STRINGS_NUMBER, { message: STRINGS_NUMBER_NOT_VALID })
  @IsNotEmpty({ message: STRINGS_NUMBER_REQUIRED })
  public stringsNumber: StringsNumber;

  @Max(PRICE.MAX, { message: PRICE_NOT_VALID })
  @Min(PRICE.MIN, { message: PRICE_NOT_VALID })
  @IsNotEmpty({ message: PRICE_REQUIRED })
  public price: number;
}
