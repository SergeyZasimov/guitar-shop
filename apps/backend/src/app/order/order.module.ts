import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from '../notify/notify.module';
import { ProductModule } from '../product/product.module';
import { OrderController } from './order.controller';
import { OrderModel, OrderSchema } from './order.model';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.name, schema: OrderSchema }]),
    ProductModule,
    NotifyModule,
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
