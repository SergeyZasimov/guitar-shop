import { Product } from './product.type';

export type OrderList = {
  product: Product;
  price: number;
  quantity: number;
  cost: number;
};

export type OrderSummary = {
  _id?: string;
  totalQuantity: number;
  totalCost: number;
  createdAt?: Date;
};
