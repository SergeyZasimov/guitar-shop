import { ProductSortingOption, QueryField, SortType } from '../types';

export const DEFAULT_PRODUCT_LIMIT = 9;

export const DEFAULT_PRODUCT_PAGE = 1;

export const DEFAULT_PRODUCT_QUERY = {
  [QueryField.SortingOption]: ProductSortingOption.AddedAt,
  [QueryField.SortType]: SortType.Desc,
  [QueryField.Limit]: 9,
  [QueryField.Page]: 1,
};
