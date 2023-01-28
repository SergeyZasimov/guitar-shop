import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { CommentController } from './comment.controller';
import { CommentModel, CommentSchema } from './comment.model';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentSchema },
    ]),
    ProductModule,
  ],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
})
export class CommentModule {}
