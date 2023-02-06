import {
  Comment,
  Product,
  ProductField,
  ProductsResponse,
} from '@guitar-shop/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unlink } from 'fs/promises';
import { join } from 'path';
import {
  AppOption,
  ConfigNamespace,
  MulterOption,
  StaticOption,
} from '../app.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductExceptionMessage } from './product.constant';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

const { App, Static, Multer } = ConfigNamespace;
const { Host, Port } = AppOption;
const { StaticDirectory } = StaticOption;
const { Storage } = MulterOption;
const { NotFound } = ProductExceptionMessage;

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService
  ) {}

  async create(dto: CreateProductDto, photo: string): Promise<Product> {
    const productEntity = new ProductEntity({
      ...dto,
      photo: this.setPhotoPath(photo),
    });
    return this.productRepository.create(productEntity);
  }

  async getProducts(query: ProductsQueryDto): Promise<ProductsResponse> {
    const result = await this.productRepository.find(query);
    return {
      [ProductField.Products]: result,
      [ProductField.TotalProductsCount]: result[0]?.totalProductsCount || 0,
      [ProductField.MinPrice]: result[0]?.minPrice || 0,
      [ProductField.MaxPrice]: result[0]?.maxPrice || 0,
    };
  }

  async getProduct(id: string): Promise<Product> {
    return await this.checkProductExist(id);
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto,
    photo?: string
  ): Promise<Product> {
    const existProduct = await this.checkProductExist(id);
    let updatedEntity;

    if (photo) {
      await this.deletePhoto(existProduct.photo);
      updatedEntity = new ProductEntity({
        ...existProduct,
        ...dto,
        photo: this.setPhotoPath(photo),
      });
    } else {
      updatedEntity = new ProductEntity({ ...existProduct, ...dto });
    }

    return this.productRepository.findOneAndUpdate({ _id: id }, updatedEntity);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productRepository.delete({ _id: id });
    if (!product) {
      throw new NotFoundException(NotFound);
    }

    await this.deletePhoto(product.photo);

    return product;
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

  private setPhotoPath(photo: string): string {
    const host = this.configService.get<string>(`${App}.${Host}`);
    const port = this.configService.get<string>(`${App}.${Port}`);

    return `http://${host}:${port}/${photo}`;
  }

  private async deletePhoto(photo: string): Promise<void> {
    if (photo) {
      const staticFolder = this.configService.get<string>(
        `${Static}.${StaticDirectory}`
      );
      const uploadFolder = this.configService.get<string>(
        `${Multer}.${Storage}`
      );

      const photoPath = join(
        `${staticFolder}/${uploadFolder}/${photo.split('/').at(-1)}`
      );
      await unlink(photoPath);
    }
  }
}
