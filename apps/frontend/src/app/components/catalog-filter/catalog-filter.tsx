import { AVAILABLE_GUITAR_TYPE, AVAILABLE_STRINGS_NUMBERS, GUITAR_COLLECTION, GuitarType, PriceRange, ProductQuery, QueryField, StringsNumber } from '@guitar-shop/core';
import { useEffect, useState } from 'react';
import { FilterProperty, FilterPropertyValue } from '../../types/component.type';
import { checkValueInCollection } from '../../utils';
import { PriceRangeFilter } from '../price-range-filter/price-range-filter';

const FILTER_CONSTRAINTS = {
  acoustic: [ '6', '7', '12' ],
  electric: [ '4', '6', '7' ],
  ukulele: [ '4' ]
};

const initialFilterState = {
  [ QueryField.GuitarTypeFilter ]: [],
  [ QueryField.StringsNumberFilter ]: []
};

export interface CatalogFilterProps {
  onFiltersChange: (newFilters: ProductQuery) => void;
  onPriceRangeChange: (priceRange: PriceRange) => void;
  onReset: () => void;
}

export function CatalogFilter({ onFiltersChange, onPriceRangeChange, onReset }: CatalogFilterProps): JSX.Element {

  const [ filters, setFilters ] = useState<ProductQuery>(initialFilterState);

  const [ isPriceShouldReset, setIsPriceShouldReset ] = useState<boolean>(false);

  const handleResetClick = () => {
    setIsPriceShouldReset(true);
    setFilters(initialFilterState);
    onReset();
  };

  const handleFilterChange = (
    property: FilterProperty,
    value: FilterPropertyValue
  ): void => {
    let newFilter = { ...filters };
    let filterCollection: typeof value[] = filters[ property ] || [];
    filterCollection = checkValueInCollection<typeof value>(filterCollection, value);
    newFilter = { ...newFilter, [ property ]: filterCollection };
    setFilters({ ...newFilter });
  };

  useEffect(() => {
    onFiltersChange(filters);
  }, [ filters ]);

  useEffect(() => {
    if (isPriceShouldReset) {
      setIsPriceShouldReset(false);
    }
  }, [ isPriceShouldReset ]);

  const setStingsNumberFilterDisabled = (stringNumber: StringsNumber) =>
    filters.guitarType &&
    filters.guitarType.length > 0 &&
    !(filters.guitarType.some((type) => FILTER_CONSTRAINTS[ type ].includes(stringNumber)));

  const setGuitarTypeFilterDisabled = (guitarType: GuitarType) =>
    filters.stringsNumber &&
    filters.stringsNumber.length > 0 &&
    !(filters.stringsNumber.some((stringsNumber) => FILTER_CONSTRAINTS[ guitarType ].includes(stringsNumber)));

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <PriceRangeFilter
        onPriceRangeChange={ onPriceRangeChange }
        isShouldReset={ isPriceShouldReset }
      />

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
                onChange={ () => handleFilterChange(QueryField.GuitarTypeFilter, type) }
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
                onChange={ () => handleFilterChange(QueryField.StringsNumberFilter, stringNumber) }
                disabled={ setStingsNumberFilterDisabled(stringNumber) }
              />
              <label htmlFor={ `${stringNumber}-strings` }>{ stringNumber }</label>
            </div>
          ))
        }
      </fieldset>

      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={ handleResetClick }
      >Очистить</button>
    </form>
  );
}
