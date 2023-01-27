import { ProductField } from '.';
import { GuitarType, StringsNumber } from '../constants';

export enum QueryField {
  Limit = 'limit',
  GuitarTypeFilter = 'guitarType',
  StringsNumberFilter = 'stringsNumber',
  SortingOption = 'sortingOption',
  SortType = 'sortType',
}

export enum ProductSortingOption {
  Price = ProductField.Price,
  Rating = ProductField.TotalRating,
  AddedAt = ProductField.AddedAt,
}

export enum SortType {
  Asc = 1,
  Desc = -1,
}

export type ProductsQuery = {
  [QueryField.Limit]?: number;
  [QueryField.GuitarTypeFilter]?: GuitarType;
  [QueryField.StringsNumberFilter]?: StringsNumber;
  [QueryField.SortingOption]?: ProductSortingOption;
  [QueryField.SortType]?: SortType;
};
