import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DEFAULT_ORDER_FORMAT_ID_LENGTH } from '../app.constant';

export const createQueryString = (query: Record<string, unknown>): string => {
  return `${Object.entries(query)
    .map(([key, value]) => {
      if (value instanceof Array && value.length > 0) {
        return `${key}=${value.join(',')}`;
      }

      if (!(value instanceof Array)) {
        return `${key}=${value}`;
      }
    })
    .filter((item) => Boolean(item))
    .join('&')} `;
};

export const checkValueInCollection = <T>(collection: T[], value: T) => {
  return collection.includes(value)
    ? collection.filter((item: T) => item !== value)
    : collection.concat(value);
};

export const formateCommentDate = (date: Date | undefined) => {
  return dayjs(date).locale('ru').format('D MMMM');
};

export const formateAdminDate = (date: Date | undefined) => {
  return dayjs(date).locale('ru').format('DD.MM.YYYY');
};

export const formatOrderId = (id: string) => {
  return id.slice(id.length - DEFAULT_ORDER_FORMAT_ID_LENGTH);
};


