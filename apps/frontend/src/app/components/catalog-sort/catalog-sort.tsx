import { ProductQuery, ProductSortingOption, QueryField, SortType } from '@guitar-shop/core';
import { AppRoute } from '../../utils';

export interface CatalogSortProps {
  sort: ProductQuery;
  location: string;
  onSortChange: (newSort: ProductQuery) => void;
}

export function CatalogSort({ onSortChange, location, sort }: CatalogSortProps): JSX.Element {

  const setSortOptionActive = (option: ProductSortingOption): string => {
    return (sort.sortingOption === option)
      ?
      'catalog-sort__type-button--active'
      : '';
  };

  const setSortTypeActive = (type: SortType): string => {
    return (sort.sortType === type)
      ?
      'catalog-sort__order-button--active'
      : '';
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>

      <div className="catalog-sort__type">
        {
          location === AppRoute.Commodities &&
          <button
            className={ `catalog-sort__type-button ${setSortOptionActive(ProductSortingOption.AddedAt)}` }
            aria-label="по цене"
            onClick={ () => onSortChange({ [ QueryField.SortingOption ]: ProductSortingOption.AddedAt }) }
          >по дате
          </button>
        }
        <button
          className={ `catalog-sort__type-button ${setSortOptionActive(ProductSortingOption.Price)}` }
          aria-label="по цене"
          onClick={ () => onSortChange({ [ QueryField.SortingOption ]: ProductSortingOption.Price }) }
        >по цене</button>
        <button
          className={ `catalog-sort__type-button ${setSortOptionActive(ProductSortingOption.Rating)}` }
          aria-label="по популярности"
          onClick={ () => onSortChange({ [ QueryField.SortingOption ]: ProductSortingOption.Rating }) }
        >по популярности</button>
      </div>

      <div className="catalog-sort__order">
        <button
          className={ `catalog-sort__order-button catalog-sort__order-button--up ${setSortTypeActive(SortType.Asc)}` }
          aria-label="По возрастанию"
          onClick={ () => onSortChange({ [ QueryField.SortType ]: SortType.Asc }) }
        ></button>
        <button
          className={ `catalog-sort__order-button catalog-sort__order-button--down ${setSortTypeActive(SortType.Desc)}` }
          aria-label="По убыванию"
          onClick={ () => onSortChange({ [ QueryField.SortType ]: SortType.Desc }) }
        ></button>
      </div>

    </div>
  );
}
