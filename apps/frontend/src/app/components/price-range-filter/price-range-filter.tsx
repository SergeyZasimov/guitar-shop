import { PriceRange, formatPrice } from '@guitar-shop/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/store.hooks';
import { getMaxProductPrice, getMinProductPrice } from '../../store/features/product/product-slice';

export const DEFAULT_PRICE_CHANGE_TIMEOUT = 3000;


const debounce = (callback: any, timeoutDelay = DEFAULT_PRICE_CHANGE_TIMEOUT) => {
  let timeout: NodeJS.Timeout;
  return (param: boolean) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(param), timeoutDelay);
  };
};

export interface PriceRangeFilterProps {
  onPriceRangeChange: (priceRange: PriceRange) => void;
  isShouldReset: boolean;
}

export function PriceRangeFilter({ onPriceRangeChange, isShouldReset }: PriceRangeFilterProps): JSX.Element {
  const minProductPrice = useAppSelector(getMinProductPrice);
  const maxProductPrice = useAppSelector(getMaxProductPrice);

  const [ priceRange, setPriceRange ] = useState<PriceRange>([ null, null ]);
  const [ isValidPriceRange, setIsValidPriceRange ] = useState<boolean>(false);

  const validatePriceRange = () => {
    const isValid = priceRange.every((price) => Boolean(price));
    if (isValid) {
      debounce(setIsValidPriceRange)(true);
      setIsValidPriceRange(false);
    }
  };

  const handlePriceRangeInput = (price: number, index: number) => {
    const newPrice = isNaN(price) || price < 0 ? null : price;
    setPriceRange((prevState: PriceRange) => {
      prevState[ index ] = newPrice;
      return [ ...prevState ];
    });

    validatePriceRange();
  };

  useEffect(() => {
    if (isShouldReset) {
      setPriceRange([ null, null ]);
    }
  }, [ isShouldReset ]);

  useEffect(() => {
    if (isValidPriceRange) {
      onPriceRangeChange(priceRange);
    }
  }, [ isValidPriceRange ]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={ formatPrice(minProductPrice) }
            id="priceMin"
            min={ 0 }
            name="от"
            value={ priceRange[ 0 ] || '' }
            onInput={ (evt: ChangeEvent<HTMLInputElement>) => handlePriceRangeInput(parseInt(evt.target.value), 0) }
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={ formatPrice(maxProductPrice) }
            id="priceMax"
            name="до"
            value={ priceRange[ 1 ] || '' }
            onInput={ (evt: ChangeEvent<HTMLInputElement>) => handlePriceRangeInput(parseInt(evt.target.value), 1) }
          />
        </div>
      </div>
    </fieldset>
  );
}
