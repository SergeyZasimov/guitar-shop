import { Order, OrderField, OrderItem } from '@guitar-shop/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_EXCEPTION_MESSAGE } from './order.constant';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

const { ORDER_NOT_FOUND } = ORDER_EXCEPTION_MESSAGE;

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const orderList = await this.getPricesForOrderList(dto.orderList);

    const orderEntity = new OrderEntity({
      ...dto,
      [OrderField.User]: userId,
      orderList,
    });

    return this.orderRepository.create(orderEntity);
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ _id: orderId });
    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }
    return order;
  }

  async deleteOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.delete({ _id: orderId });
    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }
    return order;
  }

  private async getPricesForOrderList(
    orderList: OrderItem[]
  ): Promise<OrderItem[]> {
    return await Promise.all(
      orderList.map(async (item: OrderItem): Promise<OrderItem> => {
        const product = await this.productService.checkProductExist(
          item.product
        );
        return {
          ...item,
          [OrderField.Price]: product.price,
        };
      })
    );
  }
}