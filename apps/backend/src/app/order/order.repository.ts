import { ApiQuery, Order, OrderField, SortType } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CrudRepository } from '../interfaces/repository.abstract';
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
    const result = await super.create(entityCreateData);

    return this.orderModel.populate(result, [
      { path: OrderField.User },
      {
        path: `${OrderField.OrderList}.${OrderField.Product}`,
        model: `${ProductModel.name}`,
      },
    ]);
  }

  async find(query: ApiQuery): Promise<Order[]> {
    const { sortType, sortingOption, limit, page } = query;

    const result = await this.orderModel.aggregate([
      {
        $lookup: {
          from: 'orders',
          pipeline: [],
          as: 'orders',
        },
      },
      {
        $addFields: {
          [OrderField.TotalOrdersCount]: { $size: '$orders' },
        },
      },
      { $unset: 'orders' },
      { $sort: { [sortingOption]: sortType === SortType.Asc ? 1 : -1 } },
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ]);

    await this.orderModel.populate(result, [
      { path: OrderField.User },
      {
        path: `${OrderField.OrderList}.${OrderField.Product}`,
        model: `${ProductModel.name}`,
      },
    ]);

    return result;
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

  async findOnePureOrder(
    entityFilterQuery: FilterQuery<OrderModel>
  ): Promise<OrderModel> {
    return super.findOne(entityFilterQuery);
  }

  public async findOneAndUpdate(
    entityFilterQuery: FilterQuery<OrderModel>,
    entityUpdateData: UpdateQuery<Partial<OrderModel>>
  ): Promise<OrderModel> {
    const result = await super.findOneAndUpdate(
      entityFilterQuery,
      entityUpdateData
    );

    return this.orderModel.populate(result, [
      { path: OrderField.User },
      {
        path: `${OrderField.OrderList}.${OrderField.Product}`,
        model: `${ProductModel.name}`,
      },
    ]);
  }
}
