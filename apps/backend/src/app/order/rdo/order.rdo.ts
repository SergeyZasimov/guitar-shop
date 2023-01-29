import { Order, OrderField, OrderItem, OrderSummary } from '@guitar-shop/core';
import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { ProductRdo } from '../../product/rdo/product.rdo';

export class OrderRdo implements Order {
  @Expose({ name: OrderField._Id })
  @Transform(({ obj }) => obj._id.toString())
  [OrderField.Id]: string;

  @Expose()
  @Type(() => UserRdo)
  [OrderField.User]: string;

  @Expose()
  @Type(() => OrderItemRdo)
  [OrderField.OrderList]: OrderItemRdo[];

  @Expose()
  [OrderField.OrderSummary]: OrderSummary;

  @Expose()
  [OrderField.CreateAt]: Date;
}

export class OrderItemRdo implements OrderItem {
  @Expose()
  @Type(() => ProductRdo)
  [OrderField.Product]: string;

  @Expose()
  [OrderField.Price]: number;

  @Expose()
  [OrderField.Quantity]: number;

  @Expose()
  [OrderField.Cost]: number;
}
