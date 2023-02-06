import {
  CommentField,
  DbCollection,
  Product,
  ProductField,
  SortType,
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
    const {
      limit,
      page,
      guitarType,
      stringsNumber,
      sortingOption,
      sortType,
      priceRange,
    } = query;

    const filterCondition = [];

    guitarType &&
      filterCondition.push({
        $expr: {
          $in: ['$guitarType', guitarType],
        },
      });

    stringsNumber &&
      filterCondition.push({
        $expr: { $in: ['$stringsNumber', stringsNumber] },
      });

    priceRange &&
      filterCondition.push({
        $expr: {
          $and: [
            { $gte: ['$price', priceRange[0]] },
            { $lte: ['$price', priceRange[1]] },
          ],
        },
      });

    return this.productModel.aggregate([
      {
        $lookup: {
          from: 'products',
          pipeline: [
            filterCondition.length
              ? {
                  $match: {
                    $and: filterCondition,
                  },
                }
              : { $match: {} },
          ],
          as: 'products',
        },
      },
      {
        $addFields: {
          totalProductsCount: { $size: '$products' },
          minPrice: { $min: '$products.price' },
          maxPrice: { $max: '$products.price' },
        },
      },
      { $unset: 'products' },
      filterCondition.length
        ? {
            $match: {
              $and: filterCondition,
            },
          }
        : { $match: {} },
      { $sort: { [sortingOption]: sortType === SortType.Asc ? 1 : -1 } },
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ]);
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
