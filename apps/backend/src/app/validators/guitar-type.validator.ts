import { GuitarType } from '@guitar-shop/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PRODUCT_CONSTRAINT } from '../product/product.constant';

const { GUITAR_TYPE } = PRODUCT_CONSTRAINT;

@ValidatorConstraint({ name: 'StringNumberNotValid', async: false })
export class GuitarTypeValidator implements ValidatorConstraintInterface {
  validate(value: GuitarType[]): boolean {
    return value.every((item: GuitarType) => GUITAR_TYPE.includes(item));
  }
}
