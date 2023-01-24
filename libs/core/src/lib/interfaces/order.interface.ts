import { Product } from './product.interface';

export interface OrderList {
  product: Product;
  price: number;
  quantity: number;
  cost: number;
}

export interface OrderSummary {
  _id?: string;
  totalQuantity: number;
  totalCost: number;
  createdAt?: Date;
}
