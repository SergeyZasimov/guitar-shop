import { ProductField } from '.';
import { GuitarType, StringsNumber } from '../constants';

export enum QueryField {
  Limit = 'limit',
  Page = 'page',
  GuitarTypeFilter = 'guitarType',
  StringsNumberFilter = 'stringsNumber',
  SortingOption = 'sortingOption',
  SortType = 'sortType',
  PriceRange = 'priceRange',
}

export enum ProductSortingOption {
  Price = ProductField.Price,
  Rating = ProductField.TotalRating,
  AddedAt = ProductField.CreatedAt,
}
export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}

export type PriceRange = [number | null, number | null];

export type ProductQuery = {
  [QueryField.Limit]?: number;
  [QueryField.Page]?: number;
  [QueryField.GuitarTypeFilter]?: GuitarType[];
  [QueryField.StringsNumberFilter]?: StringsNumber[];
  [QueryField.SortingOption]?: ProductSortingOption;
  [QueryField.SortType]?: SortType;
  [QueryField.PriceRange]?: PriceRange;
};
