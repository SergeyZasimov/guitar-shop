import { Comment, Product } from '@guitar-shop/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppOption, ConfigNamespace } from '../app.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductExceptionMessage } from './product.constant';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

const { App } = ConfigNamespace;
const { Host, Port } = AppOption;
const { NotFound } = ProductExceptionMessage;

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const productEntity = new ProductEntity(dto);
    return this.productRepository.create(productEntity);
  }

  async getProducts(query: ProductsQueryDto): Promise<Product[]> {
    return this.productRepository.find(query);
  }

  async getProduct(id: string): Promise<Product> {
    return await this.checkProductExist(id);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const existProduct = await this.checkProductExist(id);
    const updatedEntity = new ProductEntity({ ...existProduct, ...dto });
    return this.productRepository.findOneAndUpdate({ _id: id }, updatedEntity);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productRepository.delete({ _id: id });
    if (!product) {
      throw new NotFoundException(NotFound);
    }
    return product;
  }

  async uploadPhoto(id: string, photo: string): Promise<Product> {
    const host = this.configService.get<string>(`${App}.${Host}`);
    const port = this.configService.get<string>(`${App}.${Port}`);

    // TODO: перенести в entity
    const photoPath = `http://${host}:${port}/${photo}`;

    const existProduct = await this.checkProductExist(id);
    const updatedProduct = new ProductEntity({
      ...existProduct,
      photo: photoPath,
    });
    return this.productRepository.findOneAndUpdate({ id }, updatedProduct);
  }

  public async checkProductExist(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ _id: id });
    if (!product) {
      throw new NotFoundException(NotFound);
    }
    return product;
  }

  public async updateRating(comment: Comment): Promise<void> {
    const { product } = comment;
    await this.productRepository.updateRating(product);
  }
}
