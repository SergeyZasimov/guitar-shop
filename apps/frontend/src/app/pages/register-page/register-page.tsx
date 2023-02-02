import { NewUser, UserField } from '@guitar-shop/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store.hooks';
import { loginUser, registerUser } from '../../store/features/user/api-actions';
import { AppRoute } from '../../utils';


export function AuthPage() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [ user, setUser ] = useState<NewUser>({
    userName: '',
    email: '',
    password: ''
  });

  const [ isPasswordShow, setIsPasswordShow ] = useState<boolean>(false);

  const isLoginPage = pathname.includes(AppRoute.Login);

  const handleUserInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUser({ ...user, [ name ]: value });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (isLoginPage) {
      const { userName: _, ...authUser } = user;
      dispatch(loginUser(authUser));
    } else {
      dispatch(registerUser(user));
    }
  };

  const handleEyeButtonClick = () => {

  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          {
            isLoginPage
              ? <>
                <h1 className="login__title">Войти</h1>
                <p className="login__text">Hовый пользователь? <Link className="login__link" to={ AppRoute.Register }>Зарегистрируйтесь</Link> прямо сейчас</p>
              </>
              : <h1 className="login__title">Регистрация</h1>
          }
          <form onSubmit={ handleSubmit }>
            { !isLoginPage &&
              <div className={ `input-login ${user.userName ? 'input-login--no-error' : ''}` }>
                <label htmlFor="name">Введите имя</label>
                <input
                  type="text"
                  id="name"
                  name={ UserField.UserName }
                  autoComplete="off"
                  value={ user.userName }
                  onChange={ handleUserInput }
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
                onChange={ handleUserInput }
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
                  onChange={ handleUserInput }
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
        </section>
      </div>
    </main>
  );
}

