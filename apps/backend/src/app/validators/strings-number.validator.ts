import { StringsNumber } from '@guitar-shop/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PRODUCT_CONSTRAINT } from '../product/product.constant';

const { STRINGS_NUMBER } = PRODUCT_CONSTRAINT;

@ValidatorConstraint({ name: 'StringNumberNotValid', async: false })
export class StringsNumberValidator implements ValidatorConstraintInterface {
  validate(value: StringsNumber[]): boolean {
    return value.every((item: StringsNumber) => STRINGS_NUMBER.includes(item));
  }
}
