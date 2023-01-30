import { ProductSortingOption, SortType } from '@guitar-shop/core';

export interface CatalogSortProps {
  sortOption: ProductSortingOption;
  sortType: SortType;
  onChangeSortOption: (option: ProductSortingOption) => void;
  onChangeSortType: (type: SortType) => void;
}

export function CatalogSort({ onChangeSortOption, onChangeSortType, sortOption, sortType }: CatalogSortProps): JSX.Element {

  const setSortOptionActive = (option: ProductSortingOption): string => {
    return (sortOption !== ProductSortingOption.AddedAt && sortOption === option)
      ?
      'catalog-sort__type-button--active'
      : '';
  };

  const setSortTypeActive = (type: SortType): string => {
    return (sortOption !== ProductSortingOption.AddedAt && sortType === type)
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
          onClick={ () => onChangeSortOption(ProductSortingOption.Price) }
        >по цене</button>
        <button
          className={ `catalog-sort__type-button ${setSortOptionActive(ProductSortingOption.Rating)}` }
          aria-label="по популярности"
          onClick={ () => onChangeSortOption(ProductSortingOption.Rating) }
        >по популярности</button>
      </div>

      <div className="catalog-sort__order">
        <button
          className={ `catalog-sort__order-button catalog-sort__order-button--up ${setSortTypeActive(SortType.Asc)}` }
          aria-label="По возрастанию"
          onClick={ () => onChangeSortType(SortType.Asc) }
        ></button>
        <button
          className={ `catalog-sort__order-button catalog-sort__order-button--down ${setSortTypeActive(SortType.Desc)}` }
          aria-label="По убыванию"
          onClick={ () => onChangeSortType(SortType.Desc) }
        ></button>
      </div>

    </div>
  );
}
