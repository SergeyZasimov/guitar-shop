import { PriceRange } from '@guitar-shop/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PRODUCT_CONSTRAINT } from '../product/product.constant';

@ValidatorConstraint({ name: 'PriceRangeNotValid', async: false })
export class PriceRangeValidator implements ValidatorConstraintInterface {
  validate(value: PriceRange): boolean {
    return (
      value.length === 2 &&
      value.every((item: number) => {
        return (
          !isNaN(item) &&
          item >= PRODUCT_CONSTRAINT.PRICE.MIN &&
          item <= PRODUCT_CONSTRAINT.PRICE.MAX
        );
      })
    );
  }
}
