import { Order, OrderField, OrderItem, OrderSummary } from '@guitar-shop/core';
import { DEFAULT_ORDER_SUMMARY } from './order.constant';

export class OrderEntity implements Order {
  [OrderField.User]: string;
  [OrderField.OrderList]: OrderItem[];
  [OrderField.OrderSummary]: OrderSummary = {
    [OrderField.TotalQuantity]: DEFAULT_ORDER_SUMMARY.TOTAL_QUANTITY,
    [OrderField.TotalCost]: DEFAULT_ORDER_SUMMARY.TOTAL_COST,
  };

  constructor(data: Order) {
    this.user = data.user;
    this.orderList = data.orderList.map((item) => this.calculateItem(item));
    this.orderSummary = this.calculateSummary();
  }

  calculateItem(item: OrderItem): OrderItem {
    return { ...item, [OrderField.Cost]: item.price * item.quantity };
  }

  calculateSummary(): OrderSummary {
    return this.orderList.reduce((acc, item) => {
      const cost = acc[OrderField.TotalCost] + item.cost;
      const quantity = acc[OrderField.TotalQuantity] + item.quantity;
      return {
        [OrderField.TotalQuantity]: quantity,
        [OrderField.TotalCost]: cost,
      };
    }, this.orderSummary);
  }
}
