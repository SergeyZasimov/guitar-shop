import {
  Order,
  OrderField,
  OrderItem,
  OrderSummary,
  UserRole,
} from '@guitar-shop/core';
import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { ProductRdo } from '../../product/rdo/product.rdo';

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

export class OrderItemSummaryRdo implements OrderSummary {
  @Expose()
  [OrderField.TotalQuantity]: number;

  @Expose()
  [OrderField.TotalCost]: number;
}

export class OrderRdo implements Order {
  @Expose({ name: OrderField._Id })
  @Transform(({ obj }) => obj._id.toString())
  [OrderField.Id]: string;

  @Expose({ groups: [UserRole.Admin] })
  @Type(() => UserRdo)
  [OrderField.User]: string;

  @Expose({ groups: [UserRole.Admin] })
  @Type(() => OrderItemRdo)
  [OrderField.OrderList]: OrderItemRdo[];

  @Expose()
  @Type(() => OrderItemSummaryRdo)
  [OrderField.OrderSummary]: OrderItemSummaryRdo;

  @Expose()
  [OrderField.CreateAt]: Date;
}