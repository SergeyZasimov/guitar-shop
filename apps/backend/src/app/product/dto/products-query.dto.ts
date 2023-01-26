import {
  AVAILABLE_GUITAR_TYPE,
  AVAILABLE_STRINGS_NUMBERS,
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
  DEFAULT_PRODUCT_SORTING_OPTION,
  DEFAULT_PRODUCT_SORTING_TYPE,
} from '../product.constant';

// TODO: добавить сообщения об ошибках
export class ProductsQueryDto implements ProductsQuery {
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  [QueryField.Limit]?: number = DEFAULT_PRODUCT_LIMIT;

  @IsEnum(AVAILABLE_GUITAR_TYPE)
  @IsOptional()
  [QueryField.GuitarTypeFilter]?: GuitarType;

  @IsEnum(AVAILABLE_STRINGS_NUMBERS)
  @IsOptional()
  [QueryField.StringsNumberFilter]?: StringsNumber;

  @IsEnum(ProductSortingOption)
  @IsOptional()
  [QueryField.SortingOption]?: ProductSortingOption =
    DEFAULT_PRODUCT_SORTING_OPTION;

  @IsEnum(SortType)
  @IsOptional()
  [QueryField.SortType]?: SortType = DEFAULT_PRODUCT_SORTING_TYPE;
}
