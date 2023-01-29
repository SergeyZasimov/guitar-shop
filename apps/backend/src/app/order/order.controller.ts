import { Order, RouteDomain, RouteParam, fillObject } from '@guitar-shop/core';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { OrderRdo } from './rdo/order.rdo';

const { Order } = RouteDomain;
const { OrderId } = RouteParam;

@Controller(Order)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return fillObject(OrderRdo, await this.orderService.createOrder(dto));
  }

  @Get('')
  async getOrders(): Promise<Order> {
    return fillObject(OrderRdo, await this.orderService.getOrders());
  }

  @Get(`:${OrderId}`)
  async getOrder(@Param(OrderId) id: string): Promise<Order> {
    return fillObject(OrderRdo, await this.orderService.getOrder(id));
  }

  @Delete(`:${OrderId}`)
  async deleteOrder(@Param(OrderId) id: string): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
}
