import { AVAILABLE_GUITAR_TYPE, AVAILABLE_STRINGS_NUMBERS, ApiQuery, GUITAR_COLLECTION, GuitarType, QueryField, StringsNumber } from '@guitar-shop/core';
import { FilterProperty, FilterPropertyValue } from '../../types/component.type';

const FILTER_CONSTRAINTS = {
  acoustic: [ '6', '7', '12' ],
  electric: [ '4', '6', '7' ],
  ukulele: [ '4' ]
};

export interface CatalogFilterProps {
  filters: ApiQuery;
  onFiltersChange: (property: FilterProperty, value: FilterPropertyValue) => void;
}

export function CatalogFilter({ onFiltersChange, filters }: CatalogFilterProps): JSX.Element {

  const setStingsNumberFilterDisabled = (stringNumber: StringsNumber) =>
    filters.guitarType &&
    filters.guitarType.length > 0 &&
    !(filters.guitarType.some((type) => FILTER_CONSTRAINTS[ type ].includes(stringNumber)));

  const setGuitarTypeFilterDisabled = (guitarType: GuitarType) =>
    filters.stringsNumber &&
    filters.stringsNumber.length > 0 &&
    !(filters.stringsNumber.some((stringsNumber) => FILTER_CONSTRAINTS[ guitarType ].includes(stringsNumber)));

  return (
    <>
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
                onChange={ () => onFiltersChange(QueryField.GuitarTypeFilter, type) }
                disabled={ setGuitarTypeFilterDisabled(type) }
              />
              <label htmlFor={ type }>{ GUITAR_COLLECTION[ type ] }</label>
            </div>
          ))
        }
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          AVAILABLE_STRINGS_NUMBERS.map((stringNumber) => (
            <div key={ stringNumber } className="form-checkbox catalog-filter__block-item">
              <input
                className="visually-hidden"
                type="checkbox"
                id={ `${stringNumber}-strings` }
                name={ `${stringNumber}-strings` }
                onChange={ () => onFiltersChange(QueryField.StringsNumberFilter, stringNumber) }
                disabled={ setStingsNumberFilterDisabled(stringNumber) }
              />
              <label htmlFor={ `${stringNumber}-strings` }>{ stringNumber }</label>
            </div>
          ))
        }
      </fieldset>
    </>
  );
}
