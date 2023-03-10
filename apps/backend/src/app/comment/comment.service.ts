import { Comment, CommentField } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly productService: ProductService
  ) {}

  async create(userId: string, dto: CreateCommentDto): Promise<Comment> {
    const existProduct = await this.productService.checkProductExist(
      dto.product
    );

    if (existProduct) {
      const commentEntity = new CommentEntity({
        ...dto,
        [CommentField.Author]: userId,
      });
      const newComment = await this.commentRepository.create(commentEntity);
      await this.productService.updateRating(newComment);
      return this.commentRepository.findOne(newComment[CommentField._Id]);
    }
  }

  async getComments(productId: string): Promise<Comment[]> {
    const existProduct = await this.productService.checkProductExist(productId);

    if (existProduct) {
      return this.commentRepository.find(productId);
    }
  }
}
