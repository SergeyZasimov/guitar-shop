import { Product, ProductField, ProductsResponse } from '@guitar-shop/core';
import { Expose, Type } from 'class-transformer';
import { ProductRdo } from './product.rdo';

export class ProductsRdo implements ProductsResponse {
  @Type(() => ProductRdo)
  @Expose()
  [ProductField.Products]: Product[];

  @Expose()
  [ProductField.TotalProductsCount]: number;

  @Expose()
  [ProductField.MinPrice]: number;

  @Expose()
  [ProductField.MaxPrice]: number;
}
