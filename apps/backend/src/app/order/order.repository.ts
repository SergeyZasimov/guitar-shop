import { CrudRepository, Order, OrderField } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { OrderModel } from './order.model';

@Injectable()
export class OrderRepository extends CrudRepository<OrderModel> {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>
  ) {
    super(orderModel);
  }

  public async create(
    entityCreateData: Partial<OrderModel>
  ): Promise<OrderModel> {
    return (await super.create(entityCreateData)).populate([
      OrderField.User,
      {
        path: `${OrderField.OrderList}.${OrderField.Product}`,
        model: `${ProductModel.name}`,
      },
    ]);
  }

  async find(): Promise<Order[]> {
    return this.orderModel.find().populate([
      OrderField.User,
      {
        path: `${OrderField.OrderList}.${OrderField.Product}`,
        model: `${ProductModel.name}`,
      },
    ]);
  }

  public async findOne(
    entityFilterQuery: FilterQuery<OrderModel>
  ): Promise<OrderModel> {
    const order = await super.findOne(entityFilterQuery);

    if (order) {
      return order.populate([
        OrderField.User,
        {
          path: `${OrderField.OrderList}.${OrderField.Product}`,
          model: `${ProductModel.name}`,
        },
      ]);
    }
    return order;
  }
}