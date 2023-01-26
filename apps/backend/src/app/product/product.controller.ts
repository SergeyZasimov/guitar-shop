import { RouteDomain, RouteParam, RoutePath } from '@guitar-shop/core';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoFilterInterceptor } from '../interceptors/photo-file.interceptor';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_VALIDATION_MESSAGE } from './product.constant';
import { ProductService } from './product.service';

const { Product } = RouteDomain;
const { UploadPhoto } = RoutePath;
const { ProductId } = RouteParam;
const { PHOTO_REQUIRED } = PRODUCT_VALIDATION_MESSAGE;

@Controller(Product)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  public async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseInterceptors(PhotoFilterInterceptor())
  @Post(`:${ProductId}/${UploadPhoto}`)
  public async uploadPhoto(
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
