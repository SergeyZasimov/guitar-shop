import { SortType } from '@guitar-shop/core';

export const COMMENT_CONSTRAINT = {
  ADVANTAGES: {
    MIN: 50,
    MAX: 100,
  },
  DISADVANTAGES: {
    MIN: 50,
    MAX: 100,
  },
  TEXT: {
    MIN: 5,
    MAX: 1024,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  },
};

export const DEFAULT_COMMENT_LIMIT = 50;

export const DEFAULT_COMMENT_SORT_TYPE = SortType.Asc;
