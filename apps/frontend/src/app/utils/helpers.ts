import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const createQueryString = (query: Record<string, unknown>): string => {
  return `${Object.entries(query)
    .map(([key, value]) => {
      if (value instanceof Array) {
        return `${key}=${value.join(',')}`;
      }
      return `${key}=${value}`;
    })
    .join('&')} `;
};

export const checkValueInCollection = <T>(collection: T[], value: T) => {
  return collection.includes(value)
    ? collection.filter((item: T) => item !== value)
    : collection.concat(value);
};

export const formatPrice = (price: number | undefined): string => {
  if (price) {
    return price.toLocaleString('ru-RU');
  }
  return '';
};

export const formateDate = (date: Date | undefined) => {
  return dayjs(date).locale('ru').format('D MMMM');
};
