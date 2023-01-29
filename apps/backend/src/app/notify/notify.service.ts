import { Order, User, UserField, UserRole } from '@guitar-shop/core';
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

  // TODO: ссылка на вход в закрытую часть?
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
    const admin = await this.userRepository.findOne({
      [UserField.Role]: UserRole.Admin,
    });
    order;
    await this.mailerService.sendMail({
      to: admin.email,
      subject: EmailSubject.NewOrder,
      template: './new-order.hbs',
      context: {
        order,
      },
    });
  }
}
