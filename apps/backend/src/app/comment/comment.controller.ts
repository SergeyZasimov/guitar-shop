import { RouteDomain, RouteParam } from '@guitar-shop/core';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

// TODO: добавить rdo

const { Comment } = RouteDomain;
const { ProductId } = RouteParam;

@Controller(Comment)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  async create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Get(`:${ProductId}`)
  async getComments(@Param(ProductId, MongoidValidationPipe) productId: string) {
    return this.commentService.getComments(productId);
  }
}
