import { ProductField } from '.';

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

export type ProductQuery = {
  limit?: number;
  filterOption?: ProductFilterOption;
  sortingOption?: ProductSortingOption;
  sortType?: SortType;
};
