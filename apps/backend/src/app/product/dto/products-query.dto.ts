import {
  ApiQuery,
  DEFAULT_PRODUCT_QUERY,
  GuitarType,
  PriceRange,
  QueryField,
  SortType,
  SortingOption,
  StringsNumber,
} from '@guitar-shop/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Validate } from 'class-validator';
import { GuitarTypeValidator } from '../../validators/guitar-type.validator';
import { PriceRangeValidator } from '../../validators/price-range.validator';
import { StringsNumberValidator } from '../../validators/strings-number.validator';
import { PRODUCT_VALIDATION_MESSAGE } from '../product.constant';

const {
  GUITAR_TYPE_NOT_VALID,
  STRINGS_NUMBER_NOT_VALID,
  LIMIT_NOT_VALID,
  SORTING_OPTION_NOT_VALID,
  SORTING_TYPE_NOT_VALID,
  PAGE_NOT_VALID,
  PRICE_RANGE_NOT_VALID,
} = PRODUCT_VALIDATION_MESSAGE;

export class ProductsQueryDto implements ApiQuery {
  @IsInt({ message: LIMIT_NOT_VALID })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  [QueryField.Limit]?: number = DEFAULT_PRODUCT_QUERY[QueryField.Limit];

  @IsInt({ message: PAGE_NOT_VALID })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  [QueryField.Page]?: number = DEFAULT_PRODUCT_QUERY[QueryField.Page];

  @Validate(GuitarTypeValidator, { message: GUITAR_TYPE_NOT_VALID })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  [QueryField.GuitarTypeFilter]?: GuitarType[];

  @Validate(StringsNumberValidator, { message: STRINGS_NUMBER_NOT_VALID })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  [QueryField.StringsNumberFilter]?: StringsNumber[];

  @IsEnum(SortingOption, { message: SORTING_OPTION_NOT_VALID })
  @IsOptional()
  [QueryField.SortingOption]?: SortingOption =
    DEFAULT_PRODUCT_QUERY[QueryField.SortingOption];

  @IsEnum(SortType, { message: SORTING_TYPE_NOT_VALID })
  @IsOptional()
  [QueryField.SortType]?: SortType = DEFAULT_PRODUCT_QUERY[QueryField.SortType];

  @Validate(PriceRangeValidator, { message: PRICE_RANGE_NOT_VALID })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => parseInt(item))
  )
  @IsOptional()
  [QueryField.PriceRange]: PriceRange;
}
