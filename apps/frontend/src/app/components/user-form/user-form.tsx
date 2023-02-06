import { LoginUser, NewUser, UserField } from '@guitar-shop/core';
import { ChangeEvent, FormEvent, useState } from 'react';

export interface UserFormProps {
  isLoginPage: boolean;
  user: NewUser | LoginUser;
  onInput: (evt: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (evt: FormEvent) => void;
}

export function UserForm({ user, onInput, onSubmit, isLoginPage }: UserFormProps): JSX.Element {

  const [ isPasswordShow, setIsPasswordShow ] = useState<boolean>(false);

  return (
    <form onSubmit={ onSubmit }>
      { !isLoginPage &&
        <div className={ `input-login ${user.userName ? 'input-login--no-error' : ''}` }>
          <label htmlFor="name">Введите имя</label>
          <input
            type="text"
            id="name"
            name={ UserField.UserName }
            autoComplete="off"
            value={ user.userName }
            onChange={ onInput }
            required
          />
          <p className="input-login__error">Заполните поле</p>
        </div>
      }
      <div className={ `input-login ${user.email ? 'input-login--no-error' : ''}` }>
        <label htmlFor="email">Введите e-mail</label>
        <input
          type="email"
          id="email"
          name={ UserField.Email }
          autoComplete="off"
          value={ user.email }
          onChange={ onInput }
          required
        />
        <p className="input-login__error">Заполните поле</p>
      </div>
      <div className={ `input-login ${user.password ? 'input-login--no-error' : ''}` }>
        {
          isLoginPage
            ? <label htmlFor={ UserField.Password }>Введите пароль</label>
            : <label htmlFor={ UserField.Password }>Придумайте пароль</label>
        }
        <span>
          <input
            type={ isPasswordShow ? "text" : "password" }
            placeholder="• • • • • • • • • • • •"
            id={ UserField.Password }
            name={ UserField.Password }
            autoComplete="off"
            value={ user.password }
            onChange={ onInput }
            required
          />
          <button className="input-login__button-eye" type="button" onClick={ () => setIsPasswordShow(!isPasswordShow) }>
            <svg width="14" height="8" aria-hidden="true">
              <use xlinkHref="#icon-eye"></use>
            </svg>
          </button>
        </span>
        <p className="input-login__error">Заполните поле</p>
      </div>
      <button className="button login__button button--medium" type="submit">
        {
          isLoginPage
            ? 'Войти'
            : 'Зарегистрироваться'
        }
      </button>
    </form>
  );
}

