import { Comment, CommentField } from '@guitar-shop/core';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CrudRepository } from '../interfaces/repository.abstract';
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

  public async findOne(
    entityFilterQuery: FilterQuery<CommentModel>
  ): Promise<CommentModel> {
    const comment = await super.findOne(entityFilterQuery);
    return await comment.populate([CommentField.Author, CommentField.Product]);
  }

  public async create(
    entityCreateData: Partial<CommentModel>
  ): Promise<CommentModel> {
    return super.create(entityCreateData);
  }

  async find(productId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ [CommentField.Product]: productId })
      .sort({ [CommentField.CreatedAt]: DEFAULT_COMMENT_SORT_TYPE })
      .limit(DEFAULT_COMMENT_LIMIT)
      .populate([CommentField.Author, CommentField.Product]);
  }
}
