import { AVAILABLE_GUITAR_TYPE, AVAILABLE_STRINGS_NUMBERS, GUITAR_COLLECTION, PriceRange, QueryField } from '@guitar-shop/core';
import { FilterProperty, FilterPropertyValue } from '../../types/component.type';
import { PriceRangeFilter } from '../price-range-filter/price-range-filter';

export interface CatalogFilterProps {
  onFilterChange: (property: FilterProperty, value: FilterPropertyValue) => void;
  onPriceRangeChange: (priceRange: PriceRange) => void;
  onResetFilters: () => void;
}

export function CatalogFilter({ onFilterChange, onPriceRangeChange, onResetFilters }: CatalogFilterProps): JSX.Element {

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <PriceRangeFilter onPriceRangeChange={ onPriceRangeChange } />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          AVAILABLE_GUITAR_TYPE.map((type) => (
            <div key={ type } className="form-checkbox catalog-filter__block-item">
              <input
                className="visually-hidden"
                type="checkbox"
                id={ type }
                name={ type }
                onChange={ () => onFilterChange(QueryField.GuitarTypeFilter, type) }
              />
              <label htmlFor={ type }>{ GUITAR_COLLECTION[ type ] }</label>
            </div>
          ))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        { AVAILABLE_STRINGS_NUMBERS.map((stringNumber) => (
          <div key={ stringNumber } className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={ `${stringNumber}-strings` }
              name={ `${stringNumber}-strings` }
              onChange={ () => onFilterChange(QueryField.StringsNumberFilter, stringNumber) }
            />
            <label htmlFor={ `${stringNumber}-strings` }>{ stringNumber }</label>
          </div>
        )) }
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={ onResetFilters }
      >Очистить</button>
    </form>
  );
}
