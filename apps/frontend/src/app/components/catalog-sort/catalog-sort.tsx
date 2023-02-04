import { ApiQuery, QueryField, SortType, SortingOption } from '@guitar-shop/core';
import { AppRoute } from '../../utils';

export interface CatalogSortProps {
  sort: ApiQuery;
  location: string;
  onSortChange: (newSort: ApiQuery) => void;
}

export function CatalogSort({ onSortChange, location, sort }: CatalogSortProps): JSX.Element {

  const setSortOptionActive = (option: SortingOption): string => {
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
          location !== AppRoute.Root &&
          <button
            className={ `catalog-sort__type-button ${setSortOptionActive(SortingOption.AddedAt)}` }
            aria-label="по цене"
            onClick={ () => onSortChange({ [ QueryField.SortingOption ]: SortingOption.AddedAt }) }
          >
            по дате
          </button>
        }

        {
          location === AppRoute.Orders
            ?
            <button
              className={ `catalog-sort__type-button ${setSortOptionActive(SortingOption.TotalCost)}` }
              aria-label="по цене"
              onClick={ () => onSortChange({ [ QueryField.SortingOption ]: SortingOption.TotalCost }) }
            >
              по цене
            </button>
            :
            <button
              className={ `catalog-sort__type-button ${setSortOptionActive(SortingOption.Price)}` }
              aria-label="по цене"
              onClick={ () => onSortChange({ [ QueryField.SortingOption ]: SortingOption.Price }) }
            >
              по цене
            </button>
        }

        {
          location === AppRoute.Root &&
          <button
            className={ `catalog-sort__type-button ${setSortOptionActive(SortingOption.Rating)}` }
            aria-label="по популярности"
            onClick={ () => onSortChange({ [ QueryField.SortingOption ]: SortingOption.Rating }) }
          >
            по популярности
          </button>
        }
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
