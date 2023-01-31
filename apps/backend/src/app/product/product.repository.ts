import {
  CommentField,
  DbCollection,
  Product,
  ProductField,
} from '@guitar-shop/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CrudRepository } from '../interfaces/repository.abstract';
import { ProductsQueryDto } from './dto/products-query.dto';
import { ProductModel } from './product.model';

export class ProductRepository extends CrudRepository<ProductModel> {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>
  ) {
    super(productModel);
  }

  async find(query: ProductsQueryDto): Promise<Product[]> {
    const { limit, page, guitarType, stringsNumber, sortingOption, sortType } =
      query;

    // TODO: убрать
    console.log(query);

    const filterCondition = {};
    stringsNumber
      ? (filterCondition[ProductField.StringsNumber] = stringsNumber)
      : null;
    guitarType ? (filterCondition[ProductField.GuitarType] = guitarType) : null;

    return this.productModel
      .find(filterCondition)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ [sortingOption]: sortType });
  }

  async updateRating(id: string): Promise<void> {
    const [result] = await this.productModel.aggregate([
      {
        $match: {
          [ProductField._Id]: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: DbCollection.Comments,
          pipeline: [
            { $match: { $expr: { $eq: [`$${CommentField.Product}`, id] } } },
            { $project: { [CommentField.Rating]: 1 } },
          ],
          as: 'comments',
        },
      },
      {
        $set: {
          [ProductField.CommentsCount]: {
            $size: '$comments.rating',
          },
          [ProductField.TotalRating]: {
            $ceil: {
              $avg: '$comments.rating',
            },
          },
        },
      },
      { $unset: 'comments' },
    ]);

    await this.productModel.findOneAndUpdate(
      { [ProductField._Id]: id },
      result
    );
  }
}
