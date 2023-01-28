import { RouteDomain, RouteParam, fillObject } from '@guitar-shop/core';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

const { Comment } = RouteDomain;
const { ProductId } = RouteParam;

@Controller(Comment)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(`:${ProductId}`)
  async create(
    @Param(ProductId, MongoidValidationPipe) productId: string,
    @Body() dto: CreateCommentDto
  ) {
    return fillObject(
      CommentRdo,
      await this.commentService.create(productId, dto)
    );
  }

  @Get(`:${ProductId}`)
  async getComments(
    @Param(ProductId, MongoidValidationPipe) productId: string
  ) {
    return fillObject(
      CommentRdo,
      await this.commentService.getComments(productId)
    );
  }
}
