import {
  GuitarType,
  Product,
  ProductField,
  StringsNumber,
} from '@guitar-shop/core';

export class ProductEntity implements Product {
  [ProductField.Title]: string;
  [ProductField.Description]: string;
  [ProductField.Photo]: string;
  [ProductField.GuitarType]: GuitarType;
  [ProductField.Article]: string;
  [ProductField.StringsNumber]: StringsNumber;
  [ProductField.Price]: number;

  constructor(data: Product) {
    this.title = data.title;
    this.description = data.description;
    this.photo = data.photo;
    this.guitarType = data.guitarType;
    this.article = data.article;
    this.stringsNumber = data.stringsNumber;
    this.price = data.price;
  }
}
