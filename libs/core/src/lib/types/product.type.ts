import { GuitarType, StringsNumber } from '../constants';

export enum ProductField {
  _Id = '_id',
  Id = 'id',
  Title = 'title',
  Description = 'description',
  Photo = 'photo',
  GuitarType = 'guitarType',
  Article = 'article',
  StringsNumber = 'stringsNumber',
  Price = 'price',
  TotalRating = 'totalRating',
  CreatedAt = 'createdAt',
  CommentsCount = 'commentsCount',
  Products = 'products',
  TotalProductsCount = 'totalProductsCount',
  MinPrice = 'minPrice',
  MaxPrice = 'maxPrice',
}

export type Product = {
  [ProductField._Id]?: string;
  [ProductField.Id]?: string;
  [ProductField.Title]: string;
  [ProductField.Description]: string;
  [ProductField.Photo]?: string;
  [ProductField.GuitarType]: GuitarType;
  [ProductField.Article]: string;
  [ProductField.StringsNumber]: StringsNumber;
  [ProductField.Price]: number;
  [ProductField.TotalRating]?: number;
  [ProductField.CreatedAt]?: Date;
  [ProductField.CommentsCount]?: number;
  [ProductField.TotalProductsCount]?: number;
  [ProductField.MinPrice]?: number;
  [ProductField.MaxPrice]?: number;
};

export type NewProduct = Pick<
  Product,
  | ProductField.Title
  | ProductField.Description
  | ProductField.GuitarType
  | ProductField.Article
  | ProductField.StringsNumber
  | ProductField.Price
>;

export type ProductsResponse = {
  [ProductField.Products]: Product[];
  [ProductField.TotalProductsCount]: number;
  [ProductField.MinPrice]: number;
  [ProductField.MaxPrice]: number;
};
