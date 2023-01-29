import {
  DbCollection,
  Order,
  OrderField,
  OrderItem,
  OrderSummary,
} from '@guitar-shop/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductModule } from '../product/product.module';
import { UserModel } from '../user/user.model';
import { QUANTITY_MIN } from './order.constant';

@Schema({ _id: false })
export class OrderItemModel extends Document implements OrderItem {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ProductModule.name,
  })
  [OrderField.Product]: string;

  @Prop({
    required: true,
  })
  [OrderField.Price]: number;

  @Prop({
    required: true,
    min: QUANTITY_MIN,
  })
  [OrderField.Quantity]: number;

  @Prop({
    required: true,
  })
  [OrderField.Cost]: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItemModel);

@Schema({ _id: false })
export class OrderSummaryModel extends Document implements OrderSummary {
  @Prop({
    required: true,
  })
  [OrderField.TotalQuantity]: number;

  @Prop({
    required: true,
  })
  [OrderField.TotalCost]: number;
}

export const OrderSummarySchema =
  SchemaFactory.createForClass(OrderSummaryModel);

@Schema({
  collection: DbCollection.Orders,
  timestamps: true,
})
export class OrderModel extends Document implements Order {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserModel.name,
  })
  [OrderField.User]: string;

  @Prop({ type: [OrderItemSchema] })
  [OrderField.OrderList]: OrderItem[];

  @Prop({ type: OrderSummarySchema })
  [OrderField.OrderSummary]: OrderSummary;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
