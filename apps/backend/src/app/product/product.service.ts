import { Product } from '@guitar-shop/core';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async create(dto: CreateProductDto): Promise<Product> {
    const productEntity = new ProductEntity(dto);
    return this.productRepository.create(productEntity);
  }
}
