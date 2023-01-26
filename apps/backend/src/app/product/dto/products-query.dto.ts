import {
  ProductFilterOption,
  ProductSortingOption,
  ProductsQuery,
  QueryField,
  SortType,
} from '@guitar-shop/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_SORTING_OPTION,
  DEFAULT_SORTING_TYPE,
} from '../product.constant';

export class ProductsQueryDto implements ProductsQuery {
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  [QueryField.Limit]?: number = DEFAULT_PRODUCT_LIMIT;

  @IsEnum(ProductFilterOption)
  @IsOptional()
  [QueryField.FilterOption]?: ProductFilterOption;

  @IsEnum(ProductSortingOption)
  @IsOptional()
  [QueryField.SortingOption]?: ProductSortingOption = DEFAULT_SORTING_OPTION;

  @IsEnum(SortType)
  @IsOptional()
  [QueryField.SortType]?: SortType = DEFAULT_SORTING_TYPE;
}
