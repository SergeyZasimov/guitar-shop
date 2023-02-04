import { Product } from './product.type';

export enum OrderField {
  _Id = '_id',
  Id = 'id',
  Product = 'product',
  User = 'user',
  Price = 'price',
  Quantity = 'quantity',
  Cost = 'cost',
  TotalQuantity = 'totalQuantity',
  TotalCost = 'totalCost',
  OrderList = 'orderList',
  OrderSummary = 'orderSummary',
  CreateAt = 'createdAt',
  TotalOrdersCount = 'totalOrdersCount',
  Orders = 'orders',
}

export type OrderItem = {
  [OrderField.Product]: Product | string;
  [OrderField.Price]?: number;
  [OrderField.Quantity]: number;
  [OrderField.Cost]?: number;
};

export type OrderSummary = {
  [OrderField.TotalQuantity]: number;
  [OrderField.TotalCost]: number;
};

export type Order = {
  [OrderField._Id]?: string;
  [OrderField.Id]?: string;
  [OrderField.User]: string;
  [OrderField.OrderList]: OrderItem[];
  [OrderField.OrderSummary]?: OrderSummary;
  [OrderField.CreateAt]?: Date;
  [OrderField.TotalOrdersCount]?: number;
};

export type NewOrder = Pick<Order, OrderField.OrderList>;

export type NewOrderItem = Pick<
  OrderItem,
  OrderField.Product | OrderField.Quantity
>;

export type OrderResponse = {
  [OrderField.Orders]: Order[];
  [OrderField.TotalOrdersCount]: number;
};
