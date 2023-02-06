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

export const DEFAULT_COMMENT_QUERY = {
  LIMIT: 50,
  SORT_TYPE: SortType.Desc,
};

export const COMMENT_VALIDATION_MESSAGE = {
  ADVANTAGES_LENGTH_NOT_VALID: `Достоинства товара должны быть строкой длиной от ${COMMENT_CONSTRAINT.ADVANTAGES.MIN} до ${COMMENT_CONSTRAINT.ADVANTAGES.MAX}`,
  DISADVANTAGES_LENGTH_NOT_VALID: `Недостатки товара должны быть строкой длиной от ${COMMENT_CONSTRAINT.DISADVANTAGES.MIN} до ${COMMENT_CONSTRAINT.DISADVANTAGES.MAX}`,
  TEXT_LENGTH_NOT_VALID: `Текст комментария должен быть строкой длиной от ${COMMENT_CONSTRAINT.TEXT.MIN} до ${COMMENT_CONSTRAINT.TEXT.MAX}`,
  RATING_NOT_VALID: `Оценка товара должна быть цифрой от ${COMMENT_CONSTRAINT.RATING.MIN} до ${COMMENT_CONSTRAINT.RATING.MAX}`,
  PRODUCT_ID_NOT_VALID: 'Неверный ID товара',
};
