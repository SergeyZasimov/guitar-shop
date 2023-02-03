import { ProductQuery, ProductSortingOption, QueryField, SortType } from '@guitar-shop/core';
import { useState } from 'react';

export const DEFAULT_CUSTOMER_SORT = {
  TYPE: SortType.Desc,
  OPTION: ProductSortingOption.Price
};

export interface CatalogSortProps {
  onSortChange: (newSort: ProductQuery) => void;
}

export function CatalogSort({ onSortChange }: CatalogSortProps): JSX.Element {

  const [ sort, setSort ] = useState<ProductQuery>({
    [ QueryField.SortType ]: DEFAULT_CUSTOMER_SORT.TYPE,
    [ QueryField.SortingOption ]: DEFAULT_CUSTOMER_SORT.OPTION
  });

  const handleSortChange = (newSort: ProductQuery) => {
    setSort({ ...sort, ...newSort });
    onSortChange(newSort);
  };

  const setSortOptionActive = (option: ProductSortingOption): string => {
    return (sort.sortingOption !== ProductSortingOption.AddedAt && sort.sortingOption === option)
      ?
      'catalog-sort__type-button--active'
      : '';
  };

  const setSortTypeActive = (type: SortType): string => {
    return (sort.sortingOption !== ProductSortingOption.AddedAt && sort.sortType === type)
      ?
      'catalog-sort__order-button--active'
      : '';
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>

      <div className="catalog-sort__type">
        <button
          className={ `catalog-sort__type-button ${setSortOptionActive(ProductSortingOption.Price)}` }
          aria-label="по цене"
          onClick={ () => handleSortChange({ [ QueryField.SortingOption ]: ProductSortingOption.Price }) }
        >по цене</button>
        <button
          className={ `catalog-sort__type-button ${setSortOptionActive(ProductSortingOption.Rating)}` }
          aria-label="по популярности"
          onClick={ () => handleSortChange({ [ QueryField.SortingOption ]: ProductSortingOption.Rating }) }
        >по популярности</button>
      </div>

      <div className="catalog-sort__order">
        <button
          className={ `catalog-sort__order-button catalog-sort__order-button--up ${setSortTypeActive(SortType.Asc)}` }
          aria-label="По возрастанию"
          onClick={ () => handleSortChange({ [ QueryField.SortType ]: SortType.Asc }) }
        ></button>
        <button
          className={ `catalog-sort__order-button catalog-sort__order-button--down ${setSortTypeActive(SortType.Desc)}` }
          aria-label="По убыванию"
          onClick={ () => handleSortChange({ [ QueryField.SortType ]: SortType.Desc }) }
        ></button>
      </div>

    </div>
  );
}
