import {
  RouteDomain,
  RouteParam,
  RoutePath,
  fillObject,
} from '@guitar-shop/core';
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
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_VALIDATION_MESSAGE } from './product.constant';
import { ProductService } from './product.service';
import { ProductRdo } from './rdo/product.rdo';

const { Product } = RouteDomain;
const { UploadPhoto } = RoutePath;
const { ProductId } = RouteParam;
const { PHOTO_REQUIRED } = PRODUCT_VALIDATION_MESSAGE;

@Controller(Product)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async create(@Body() dto: CreateProductDto) {
    return fillObject(ProductRdo, await this.productService.create(dto));
  }

  @Get('')
  async getProducts(@Query() query: ProductsQueryDto) {
    return fillObject(ProductRdo, await this.productService.getProducts(query));
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
    return fillObject(
      ProductRdo,
      await this.productService.uploadPhoto(id, file.filename)
    );
  }

  @Get(`:${ProductId}`)
  async getProduct(@Param(ProductId, MongoidValidationPipe) id: string) {
    return fillObject(ProductRdo, await this.productService.getProduct(id));
  }

  @Patch(`:${ProductId}`)
  async updateProduct(
    @Param(ProductId, MongoidValidationPipe) id: string,
    @Body() dto: UpdateProductDto
  ) {
    return fillObject(
      ProductRdo,
      await this.productService.updateProduct(id, dto)
    );
  }

  @Delete(`:${ProductId}`)
  async deleteProduct(@Param(ProductId, MongoidValidationPipe) id: string) {
    return fillObject(ProductRdo, await this.productService.deleteProduct(id));
  }
}
