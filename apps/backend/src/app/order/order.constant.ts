export const QUANTITY_MIN = 1;

export const DEFAULT_ORDER_SUMMARY = {
  TOTAL_COST: 0,
  TOTAL_QUANTITY: 0,
};

export const ORDER_VALIDATION_MESSAGE = {
  QUANTITY_NOT_VALID: `Минимальное количество товара ${QUANTITY_MIN}`,
  QUANTITY_REQUIRED: `Количество товара - обязательное поле`,
  PRODUCT_ID_REQUIRED: `ID товара - обязательное поле`,
  PRODUCT_ID_NOT_VALID: 'Неверный ID товара',
  ORDER_LIST_REQUIRED: 'Список товаров не может быть пустым',
  LIMIT_NOT_VALID: 'Количество заказов на странице должно быть числом',
  PAGE_NOT_VALID: 'Номер страницы должен быть числом',
  SORTING_OPTION_NOT_VALID: 'Неверная сортировка списка заказов',
  SORTING_TYPE_NOT_VALID: 'Неверное направление сортировки',
};

export const ORDER_EXCEPTION_MESSAGE = {
  ORDER_NOT_FOUND: 'Заказ не найден',
};
