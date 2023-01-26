import { ProductField } from '.';

export enum QueryField {
  Limit = 'limit',
  FilterOption = 'filterOption',
  SortingOption = 'sortingOption',
  SortType = 'sortType',
}

export enum ProductFilterOption {
  GuitarType = ProductField.GuitarType,
  StringsNumber = ProductField.StringsNumber,
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
  [QueryField.FilterOption]?: ProductFilterOption;
  [QueryField.SortingOption]?: ProductSortingOption;
  [QueryField.SortType]?: SortType;
};
