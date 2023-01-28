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
    const { limit, page, guitarType, stringsNumber, sortingOption, sortType } =
      query;

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
}
