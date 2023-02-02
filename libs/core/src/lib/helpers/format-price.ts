export const formatPrice = (price: number | undefined): string => {
  if (price) {
    return price.toLocaleString('ru-RU');
  }
  return '';
};
