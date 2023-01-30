import { ProductSortingOption, QueryField, SortType } from '../types';

export const DEFAULT_PRODUCT_SORTING = {
  [QueryField.SortingOption]: ProductSortingOption.Price,
  [QueryField.SortType]: SortType.Desc,
};
