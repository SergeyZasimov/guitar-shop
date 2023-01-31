import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductService } from '../product/product.service';

@Injectable()
export class ProductsResponseInterceptor implements NestInterceptor {
  constructor(private readonly productService: ProductService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    console.log(context.switchToHttp().getRequest().query);
    return next.handle();
  }
}
