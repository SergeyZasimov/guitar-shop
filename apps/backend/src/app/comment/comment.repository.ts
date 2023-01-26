import { Comment, CommentField, CrudRepository } from '@guitar-shop/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DEFAULT_COMMENT_LIMIT,
  DEFAULT_COMMENT_SORT_TYPE,
} from './comment.constant';
import { CommentModel } from './comment.model';

export class CommentRepository extends CrudRepository<CommentModel> {
  constructor(
    @InjectModel(CommentModel.name)
    private readonly commentModel: Model<CommentModel>
  ) {
    super(commentModel);
  }

  async find(productId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ [CommentField.Product]: productId })
      .limit(DEFAULT_COMMENT_LIMIT)
      .sort({ [CommentField.CratedAt]: DEFAULT_COMMENT_SORT_TYPE });
  }
}
