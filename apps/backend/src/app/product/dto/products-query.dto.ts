import {
  ProductFilterOption,
  ProductQuery,
  ProductSortingOption,
  SortType,
} from '@guitar-shop/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { DEFAULT_PRODUCT_LIMIT } from '../product.constant';

export class ProductsQueryDto implements ProductQuery {
  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  public limit?: number = DEFAULT_PRODUCT_LIMIT;

  @IsEnum(ProductFilterOption)
  @IsOptional()
  public filterOption?: ProductFilterOption;

  @IsEnum(ProductSortingOption)
  @IsOptional()
  public sortingOption?: ProductSortingOption;

  @IsEnum(SortType)
  @IsOptional()
  public sortType?: SortType;
}
