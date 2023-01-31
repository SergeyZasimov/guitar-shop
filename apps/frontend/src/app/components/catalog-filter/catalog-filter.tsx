import { AVAILABLE_GUITAR_TYPE, AVAILABLE_STRINGS_NUMBERS, GUITAR_COLLECTION, QueryField } from '@guitar-shop/core';
import { FilterProperty, FilterPropertyValue } from '../../types/component.type';

export interface CatalogFilterProps {
  onFilterChange: (property: FilterProperty, value: FilterPropertyValue) => void;
}

export function CatalogFilter({ onFilterChange }: CatalogFilterProps): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          AVAILABLE_GUITAR_TYPE.map((type) => (
            <div className="form-checkbox catalog-filter__block-item">
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
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}
