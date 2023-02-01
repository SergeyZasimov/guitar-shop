import {
  RequestUser,
  RouteDomain,
  RouteParam,
  fillObject,
} from '@guitar-shop/core';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

const { CommentDomain } = RouteDomain;
const { ProductId } = RouteParam;

@Controller(CommentDomain)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post(`:${ProductId}`)
  async create(
    @Param(ProductId, MongoidValidationPipe) productId: string,
    @GetCurrentUser(RequestUser.Sub) userId: string,
    @Body() dto: CreateCommentDto
  ) {
    return fillObject(
      CommentRdo,
      await this.commentService.create(productId, userId, dto)
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
