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

export enum SortingOption {
  Price = ProductField.Price,
  Rating = ProductField.TotalRating,
  AddedAt = ProductField.CreatedAt,
}
export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}

export type PriceRange = [number | null, number | null];

export type ApiQuery = {
  [QueryField.Limit]?: number;
  [QueryField.Page]?: number;
  [QueryField.GuitarTypeFilter]?: GuitarType[];
  [QueryField.StringsNumberFilter]?: StringsNumber[];
  [QueryField.SortingOption]?: SortingOption;
  [QueryField.SortType]?: SortType;
  [QueryField.PriceRange]?: PriceRange;
};
