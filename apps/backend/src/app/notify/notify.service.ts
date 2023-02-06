import {
  Order,
  OrderField,
  OrderItem,
  ProductField,
  User,
  UserField,
  UserRole,
  formatPrice,
} from '@guitar-shop/core';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { EmailSubject } from './notify.constant';

@Injectable()
export class NotifyService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository
  ) {}

  async sendRegisterNotify(user: User, password: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: EmailSubject.UserRegister,
      template: './register.hbs',
      context: {
        login: `${user.email}`,
        password: `${password}`,
      },
    });
  }

  async sendNewOrderNotify(order: Order): Promise<void> {
    const formatOrder = {
      ...order,
      [OrderField.OrderList]: order.orderList.map((item: OrderItem) => ({
        ...item,
        [ProductField.Price]: formatPrice(item.price),
        [OrderField.Cost]: formatPrice(item.cost),
      })),
      [OrderField.OrderSummary]: {
        ...order.orderSummary,
        [OrderField.TotalCost]: formatPrice(order.orderSummary.totalCost),
      },
    };

    const admin = await this.userRepository.findOne({
      [UserField.Role]: UserRole.Admin,
    });
    order;
    await this.mailerService.sendMail({
      to: admin.email,
      subject: EmailSubject.NewOrder,
      template: './new-order.hbs',
      context: {
        order: formatOrder,
      },
    });
  }
}
