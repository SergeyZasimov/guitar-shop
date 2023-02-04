import {
  RouteDomain,
  RouteParam,
  UserRole,
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { PhotoFilterInterceptor } from '../interceptors/photo-file.interceptor';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_VALIDATION_MESSAGE } from './product.constant';
import { ProductService } from './product.service';
import { ProductRdo } from './rdo/product.rdo';
import { ProductsRdo } from './rdo/products.rdo';

const { ProductDomain } = RouteDomain;
const { ProductId } = RouteParam;
const { PHOTO_REQUIRED } = PRODUCT_VALIDATION_MESSAGE;

@Controller(ProductDomain)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(PhotoFilterInterceptor())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Admin)
  @Post('')
  async create(
    @Body() dto: CreateProductDto,
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
      await this.productService.create(dto, file.filename)
    );
  }

  @Get('')
  async getProducts(@Query() query: ProductsQueryDto) {
    return fillObject(
      ProductsRdo,
      await this.productService.getProducts(query)
    );
  }

  @Get(`:${ProductId}`)
  async getProduct(@Param(ProductId, MongoidValidationPipe) id: string) {
    return fillObject(ProductRdo, await this.productService.getProduct(id));
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Admin)
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

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Admin)
  @Delete(`:${ProductId}`)
  async deleteProduct(@Param(ProductId, MongoidValidationPipe) id: string) {
    return fillObject(ProductRdo, await this.productService.deleteProduct(id));
  }
}
