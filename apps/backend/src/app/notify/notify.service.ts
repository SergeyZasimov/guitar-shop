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
import { ConfigService } from '@nestjs/config';
import { AppOption, ConfigNamespace } from '../app.constant';
import { UserRepository } from '../user/user.repository';
import { EmailSubject } from './notify.constant';

const { App } = ConfigNamespace;
const { Host, FrontendDevServerPort } = AppOption;

@Injectable()
export class NotifyService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {}

  async sendRegisterNotify(user: User, password: string): Promise<void> {
    const host = this.configService.get<string>(`${App}.${Host}`);
    const frontPort = this.configService.get<string>(
      `${App}.${FrontendDevServerPort}`
    );

    const loginUrl = `http://${host}:${frontPort}/login`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: EmailSubject.UserRegister,
      template: './register.hbs',
      context: {
        loginUrl,
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
