import { CrudRepository, Product } from '@guitar-shop/core';
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

  public async find(query: ProductsQueryDto): Promise<Product[]> {
    const { limit, filterOption, sortingOption, sortType } = query;
    return this.productModel
      .find({ [filterOption]: true })
      .limit(limit)
      .sort({ [sortingOption]: sortType });
  }
}
