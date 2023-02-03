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
}

export type OrderItem = {
  [OrderField.Product]: string;
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
};

export type NewOrder = Pick<Order, OrderField.OrderList>;

export type NewOrderItem = Pick<
  OrderItem,
  OrderField.Product | OrderField.Quantity
>;
