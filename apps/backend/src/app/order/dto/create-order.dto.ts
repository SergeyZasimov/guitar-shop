import { NewOrder, NewOrderItem, OrderField } from '@guitar-shop/core';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  Min,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { ORDER_VALIDATION_MESSAGE, QUANTITY_MIN } from '../order.constant';

const {
  PRODUCT_ID_NOT_VALID,
  QUANTITY_NOT_VALID,
  ORDER_LIST_REQUIRED,
  PRODUCT_ID_REQUIRED,
  QUANTITY_REQUIRED,
} = ORDER_VALIDATION_MESSAGE;

export class CreateOrderItemDto implements NewOrderItem {
  @IsMongoId({
    message: (args: ValidationArguments) => {
      console.log(args);
      return PRODUCT_ID_NOT_VALID;
    },
  })
  @IsNotEmpty({ message: PRODUCT_ID_REQUIRED })
  [OrderField.Product]: string;

  @Min(QUANTITY_MIN, {
    message: QUANTITY_NOT_VALID,
  })
  @IsNotEmpty({ message: QUANTITY_REQUIRED })
  [OrderField.Quantity]: number;
}

export class CreateOrderDto implements NewOrder {
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty({ message: ORDER_LIST_REQUIRED })
  [OrderField.OrderList]: CreateOrderItemDto[];
}
