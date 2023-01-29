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

  async create(
    productId: string,
    userId: string,
    dto: CreateCommentDto
  ): Promise<Comment> {
    if (await this.productService.checkProductExist(productId)) {
      const commentEntity = new CommentEntity({
        ...dto,
        [CommentField.Product]: productId,
        [CommentField.Author]: userId,
      });
      const newComment = await this.commentRepository.create(commentEntity);
      await this.productService.updateRating(newComment);
      return this.commentRepository.findOne(newComment[CommentField._Id]);
    }
  }

  async getComments(productId: string): Promise<Comment[]> {
    return this.commentRepository.find(productId);
  }
}
