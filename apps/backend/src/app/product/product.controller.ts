import { RouteDomain } from '@guitar-shop/core';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

const { Product } = RouteDomain;

@Controller(Product)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  public async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
}
