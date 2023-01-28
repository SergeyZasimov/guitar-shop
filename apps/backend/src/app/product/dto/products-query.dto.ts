import {
  GuitarType,
  ProductSortingOption,
  ProductsQuery,
  QueryField,
  SortType,
  StringsNumber,
} from '@guitar-shop/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_PAGE,
  DEFAULT_PRODUCT_SORTING_OPTION,
  DEFAULT_PRODUCT_SORTING_TYPE,
  PRODUCT_CONSTRAINT,
  PRODUCT_VALIDATION_MESSAGE,
} from '../product.constant';

const { GUITAR_TYPE, STRINGS_NUMBER } = PRODUCT_CONSTRAINT;
const {
  GUITAR_TYPE_NOT_VALID,
  STRINGS_NUMBER_NOT_VALID,
  LIMIT_NOT_VALID,
  SORTING_OPTION_NOT_VALID,
  SORTING_TYPE_NOT_VALID,
  PAGE_NOT_VALID,
} = PRODUCT_VALIDATION_MESSAGE;

export class ProductsQueryDto implements ProductsQuery {
  @IsInt({ message: LIMIT_NOT_VALID })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  [QueryField.Limit]?: number = DEFAULT_PRODUCT_LIMIT;

  @IsInt({ message: PAGE_NOT_VALID })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  [QueryField.Page]?: number = DEFAULT_PRODUCT_PAGE;

  @IsEnum(GUITAR_TYPE, { message: GUITAR_TYPE_NOT_VALID })
  @IsOptional()
  [QueryField.GuitarTypeFilter]?: GuitarType;

  @IsEnum(STRINGS_NUMBER, { message: STRINGS_NUMBER_NOT_VALID })
  @IsOptional()
  [QueryField.StringsNumberFilter]?: StringsNumber;

  @IsEnum(ProductSortingOption, { message: SORTING_OPTION_NOT_VALID })
  @IsOptional()
  [QueryField.SortingOption]?: ProductSortingOption =
    DEFAULT_PRODUCT_SORTING_OPTION;

  @IsEnum(SortType, { message: SORTING_TYPE_NOT_VALID })
  @IsOptional()
  [QueryField.SortType]?: SortType = DEFAULT_PRODUCT_SORTING_TYPE;
}
