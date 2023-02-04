import {
  Order,
  OrderField,
  OrderItem,
  OrderResponse,
  OrderSummary,
  Product,
  UserRole,
} from '@guitar-shop/core';
import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';
import { ProductRdo } from '../../product/rdo/product.rdo';

export class OrderItemRdo implements OrderItem {
  @Expose()
  @Type(() => ProductRdo)
  [OrderField.Product]: Product;

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

export class OrdersResponseRdo implements OrderResponse {
  @Expose()
  @Type(() => OrderRdo)
  [OrderField.Orders]: Order[];

  @Expose()
  [OrderField.TotalOrdersCount]: number;
}
