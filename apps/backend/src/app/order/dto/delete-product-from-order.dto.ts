import { IsMongoId } from 'class-validator';
import { ORDER_VALIDATION_MESSAGE } from '../order.constant';

export class DeleteProductFromOrderDto {
  @IsMongoId({ message: ORDER_VALIDATION_MESSAGE.PRODUCT_ID_NOT_VALID })
  productId: string;
}
