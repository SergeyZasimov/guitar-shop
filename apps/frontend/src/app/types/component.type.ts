import {
  GuitarType,
  ProductQuery,
  QueryField,
  StringsNumber,
} from '@guitar-shop/core';

export type FilterProperty = keyof Pick<
  ProductQuery,
  QueryField.GuitarTypeFilter | QueryField.StringsNumberFilter
>;
export type FilterPropertyValue = StringsNumber | GuitarType;
