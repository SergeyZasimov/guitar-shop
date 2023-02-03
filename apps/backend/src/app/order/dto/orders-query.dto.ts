import {
  ApiQuery,
  DEFAULT_PRODUCT_QUERY,
  QueryField,
  SortType,
  SortingOption,
} from '@guitar-shop/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ORDER_VALIDATION_MESSAGE } from '../order.constant';

const {
  LIMIT_NOT_VALID,
  PAGE_NOT_VALID,
  SORTING_OPTION_NOT_VALID,
  SORTING_TYPE_NOT_VALID,
} = ORDER_VALIDATION_MESSAGE;

export class OrdersQueryDto implements ApiQuery {
  @IsInt({ message: LIMIT_NOT_VALID })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  [QueryField.Limit]?: number = DEFAULT_PRODUCT_QUERY[QueryField.Limit];

  @IsInt({ message: PAGE_NOT_VALID })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  [QueryField.Page]?: number = DEFAULT_PRODUCT_QUERY[QueryField.Page];

  @IsEnum(SortingOption, { message: SORTING_OPTION_NOT_VALID })
  @IsOptional()
  [QueryField.SortingOption]?: SortingOption =
    DEFAULT_PRODUCT_QUERY[QueryField.SortingOption];

  @IsEnum(SortType, { message: SORTING_TYPE_NOT_VALID })
  @IsOptional()
  [QueryField.SortType]?: SortType = DEFAULT_PRODUCT_QUERY[QueryField.SortType];
}
