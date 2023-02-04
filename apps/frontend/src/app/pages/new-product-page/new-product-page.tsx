import { AVAILABLE_GUITAR_TYPE, AVAILABLE_STRINGS_NUMBERS, ProductField } from '@guitar-shop/core';
import { FormEvent, Fragment, useState } from 'react';
import { GUITAR_TYPE_EXPRESSION } from '../../app.constant';
import { Breadcrumbs } from '../../components';
import { useAppDispatch } from '../../hooks/store.hooks';
import { createProduct } from '../../store/features/product/api-actions';

export interface NewProductPageProps { }

export type PostProduct = Record<string, FormDataEntryValue | null>;

export function NewProductPage(props: NewProductPageProps) {

  const [ photo, setPhoto ] = useState<File>();

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    const data = {
      title: formData.get(ProductField.Title),
      description: formData.get(ProductField.Description),
      stringsNumber: formData.get(ProductField.StringsNumber),
      guitarType: formData.get(ProductField.GuitarType),
      article: formData.get(ProductField.Article),
      price: formData.get(ProductField.Price),
      photo: formData.get(ProductField.Photo)
    };
    dispatch(createProduct(data));

  };

  const handleAddImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = () => {
      if (input.files) {
        setPhoto(input.files[ 0 ]);
      }
    };
  };

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <Breadcrumbs />
          <form
            className="add-item__form"
            action="#"
            method="post"
            onSubmit={ (evt) => handleFormSubmit(evt) }
            encType='multipart/form-data'
          >
            <div className="add-item__form-left">
              <div className="edit-item-image add-item__form-image">
                <div className="edit-item-image__image-wrap">
                  <img src={ photo ? URL.createObjectURL(photo) : '' } />
                </div>
                <div className="edit-item-image__btn-wrap">
                  <button
                    type='button'
                    className="button button--small button--black-border edit-item-image__btn"
                    onClick={ handleAddImageClick }
                  >
                    Добавить
                  </button>

                  <button
                    type='button'
                    className="button button--small button--black-border edit-item-image__btn"
                    onClick={ () => setPhoto(undefined) }
                  >
                    Удалить
                  </button>
                </div>
              </div>

              <div className="input-radio add-item__form-radio">
                <span>Выберите тип товара</span>
                {
                  AVAILABLE_GUITAR_TYPE.map((type) => (
                    <Fragment key={ type }>
                      <input
                        type="radio"
                        id={ type }
                        name={ ProductField.GuitarType }
                        value={ type }
                      />
                      <label htmlFor={ type }
                      >
                        { GUITAR_TYPE_EXPRESSION[ type ] }
                      </label>
                    </Fragment>
                  ))
                }
              </div>

              <div className="input-radio add-item__form-radio">
                <span>Количество струн</span>
                {
                  AVAILABLE_STRINGS_NUMBERS.map((stringNumber) => (
                    <Fragment key={ stringNumber }>
                      <input
                        type="radio"
                        id={ `string-qty-${stringNumber}` }
                        name={ ProductField.StringsNumber }
                        value={ stringNumber }
                      />
                      <label htmlFor={ `string-qty-${stringNumber}` }>{ stringNumber }</label>
                    </Fragment>
                  ))
                }
              </div>
            </div>

            <div className="add-item__form-right">
              <div className="custom-input add-item__form-input">
                <label>
                  <span>Дата добавления товара</span>
                  <input
                    type="text"
                    name={ ProductField.CreatedAt }
                    placeholder="Дата в формате 00.00.0000"
                    readOnly
                  />
                </label>
                <p>Заполните поле</p>
              </div>

              <div className="custom-input add-item__form-input">
                <label>
                  <span>Введите наименование товара</span>
                  <input
                    type="text"
                    name={ ProductField.Title }
                    placeholder="Наименование"
                  />
                </label>
                <p>Заполните поле</p>
              </div>

              <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                <label>
                  <span>Введите цену товара</span>
                  <input
                    type="text"
                    name={ ProductField.Price }
                    placeholder="Цена в формате 00 000"
                  />
                </label>
                <p>Заполните поле</p>
              </div>

              <div className="custom-input add-item__form-input">
                <label>
                  <span>Введите артикул товара</span>
                  <input
                    type="text"
                    name={ ProductField.Article }
                    placeholder="Артикул товара"
                  />
                </label>
                <p>Заполните поле</p>
              </div>

              <div className="custom-textarea add-item__form-textarea">
                <label>
                  <span>Введите описание товара</span>
                  <textarea
                    name={ ProductField.Description }
                    placeholder=""
                  ></textarea>
                </label>
                <p>Заполните поле</p>
              </div>
            </div>

            <div className="add-item__form-buttons-wrap">
              <button
                className="button button--small add-item__form-button"
                type="submit"
              >
                Сохранить изменения
              </button>

              <button
                className="button button--small add-item__form-button"
                type="button"
              >
                Вернуться к списку товаров
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
