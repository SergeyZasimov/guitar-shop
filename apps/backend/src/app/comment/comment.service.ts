import { Comment } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const commentEntity = new CommentEntity(dto);
    return this.commentRepository.create(commentEntity);
  }

  async getComments(productId: string): Promise<Comment[]> {
    return this.commentRepository.find(productId);
  }
}
