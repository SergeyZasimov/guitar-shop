import {
  Order,
  RequestUser,
  RouteDomain,
  RouteParam,
  UserField,
  UserRole,
  fillObject,
} from '@guitar-shop/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { OrderRdo } from './rdo/order.rdo';

const { OrderDomain } = RouteDomain;
const { OrderId } = RouteParam;

@Controller(OrderDomain)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOrder(
    @Body() dto: CreateOrderDto,
    @GetCurrentUser(RequestUser.Sub) userId: string
  ): Promise<void> {
    await this.orderService.createOrder(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getOrders(
    @GetCurrentUser(UserField.Role) role: string
  ): Promise<Order> {
    return fillObject(OrderRdo, await this.orderService.getOrders(), role);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Admin)
  @Get(`:${OrderId}`)
  async getOrder(
    @Param(OrderId) id: string,
    @GetCurrentUser(UserField.Role) role: string
  ): Promise<Order> {
    return fillObject(OrderRdo, await this.orderService.getOrder(id), role);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Admin)
  @Delete(`:${OrderId}`)
  async deleteOrder(@Param(OrderId) id: string): Promise<Order> {
    return this.orderService.deleteOrder(id);
  }
}
