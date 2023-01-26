import { RouteDomain, RouteParam, RoutePath } from '@guitar-shop/core';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoFilterInterceptor } from '../interceptors/photo-file.interceptor';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { PRODUCT_VALIDATION_MESSAGE } from './product.constant';
import { ProductService } from './product.service';

const { Product } = RouteDomain;
const { UploadPhoto } = RoutePath;
const { ProductId } = RouteParam;
const { PHOTO_REQUIRED } = PRODUCT_VALIDATION_MESSAGE;

// TODO: добавить rdo

@Controller(Product)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get('')
  async getProducts(@Query() query: ProductsQueryDto) {
    return this.productService.getProducts(query);
  }

  @Get(`:${ProductId}`)
  async getProduct(@Param(ProductId, MongoidValidationPipe) id: string) {
    return this.productService.getProduct(id);
  }

  @Delete(`:${ProductId}`)
  async deleteProduct(@Param(ProductId, MongoidValidationPipe) id: string) {
    return this.productService.deleteProduct(id);
  }

  @UseInterceptors(PhotoFilterInterceptor())
  @Patch(`:${ProductId}/${UploadPhoto}`)
  async uploadPhoto(
    @Param(ProductId, MongoidValidationPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory() {
          throw new BadRequestException(PHOTO_REQUIRED);
        },
      })
    )
    file: Express.Multer.File
  ) {
    return this.productService.uploadPhoto(id, file.filename);
  }
}
