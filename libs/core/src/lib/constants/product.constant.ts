import { QueryField, SortType, SortingOption } from '../types';

export const DEFAULT_PRODUCT_LIMIT = 9;

export const DEFAULT_PRODUCT_PAGE = 1;

export const DEFAULT_PRODUCT_QUERY = {
  [QueryField.SortingOption]: SortingOption.AddedAt,
  [QueryField.SortType]: SortType.Desc,
  [QueryField.Limit]: 9,
  [QueryField.Page]: 1,
};
