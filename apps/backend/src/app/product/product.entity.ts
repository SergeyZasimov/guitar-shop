import { GuitarType, Product, StringsNumber } from '@guitar-shop/core';

export class ProductEntity implements Product {
  public title: string;
  public description: string;
  public photo: string;
  public guitarType: GuitarType;
  public article: string;
  public stringsNumber: StringsNumber;
  public price: number;

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
