import { CrudRepository, Product, ProductField } from '@guitar-shop/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const { limit, guitarType, stringsNumber, sortingOption, sortType } = query;
    return this.productModel
      .find()
      .where({
        [ProductField.GuitarType]: guitarType,
        [ProductField.StringsNumber]: stringsNumber,
      })
      .limit(limit)
      .sort({ [sortingOption]: sortType });
  }
}
