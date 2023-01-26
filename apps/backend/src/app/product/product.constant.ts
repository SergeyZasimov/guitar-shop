import {
  AVAILABLE_GUITAR_TYPE,
  AVAILABLE_STRINGS_NUMBERS,
  ProductField,
  ProductSortingOption,
  SortType,
} from '@guitar-shop/core';

export const UPLOAD_FIELD_NAME = ProductField.Photo;

export const DEFAULT_PRODUCT_LIMIT = 9;

export const DEFAULT_PRODUCT_SORTING_OPTION = ProductSortingOption.AddedAt;

export const DEFAULT_PRODUCT_SORTING_TYPE = SortType.Asc;

export const PRODUCT_CONSTRAINT = {
  TITLE: {
    MIN: 10,
    MAX: 100,
  },
  DESCRIPTION: {
    MIN: 20,
    MAX: 1024,
  },
  ARTICLE: {
    MIN: 5,
    MAX: 40,
  },
  PRICE: {
    MIN: 100,
    MAX: 1_000_000,
  },
  RATING: {
    MIN: 0,
    MAX: 5,
  },
  PHOTO_TYPE: /(jpg|jpeg|png)$/,
  GUITAR_TYPE: AVAILABLE_GUITAR_TYPE,
  STRINGS_NUMBER: AVAILABLE_STRINGS_NUMBERS,
} as const;

export const PRODUCT_VALIDATION_MESSAGE = {
  TITLE_REQUIRED: 'Наименование товара - обязательное поле',
  DESCRIPTION_REQUIRED: 'Описание товара - обязательное поле',
  GUITAR_TYPE_REQUIRED: 'Тип гитары - обязательное поле',
  PRICE_REQUIRED: 'Цена товара - обязательное поле',
  ARTICLE_REQUIRED: 'Артикул - обязательное поле',
  PHOTO_REQUIRED: 'Фотография товара - обязательное поле',
  STRINGS_NUMBER_REQUIRED: 'Количество струн - обязательное поле',
  TITLE_LENGTH_NOT_VALID: `Наименование товара должно быть строкой длиной от ${PRODUCT_CONSTRAINT.TITLE.MIN} до ${PRODUCT_CONSTRAINT.TITLE.MAX} символов`,
  DESCRIPTION_LENGTH_NOT_VALID: `Наименование товара должно быть строкой длиной от ${PRODUCT_CONSTRAINT.DESCRIPTION.MIN} до ${PRODUCT_CONSTRAINT.DESCRIPTION.MAX} символов`,
  ARTICLE_NOT_VALID: `Артикул должен быть строкой длиной от ${PRODUCT_CONSTRAINT.ARTICLE.MIN} до ${PRODUCT_CONSTRAINT.ARTICLE.MAX}`,
  PRICE_NOT_VALID: `Цена товара должна быть от ${PRODUCT_CONSTRAINT.PRICE.MIN} до ${PRODUCT_CONSTRAINT.PRICE.MAX}`,
  PHOTO_NOT_VALID: 'Фотография товара должна быть в формате jpg или png',
  GUITAR_TYPE_NOT_VALID: `Тип гитары должен быть из списка: ${PRODUCT_CONSTRAINT.GUITAR_TYPE.join(
    ', '
  )}`,
  STRINGS_NUMBER_NOT_VALID: `Количество струн должно быть ${PRODUCT_CONSTRAINT.STRINGS_NUMBER.join(
    ', '
  )}`,
} as const;

export enum ProductExceptionMessage {
  NotFound = 'Товар не найден',
  Forbidden = 'Неверная роль пользователя',
}
