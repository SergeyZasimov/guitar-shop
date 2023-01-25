import { CrudRepository } from '@guitar-shop/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModel } from './product.model';

export class ProductRepository extends CrudRepository<ProductModel> {
  constructor(
    @InjectModel(ProductModel.name) productModel: Model<ProductModel>
  ) {
    super(productModel);
  }
}
