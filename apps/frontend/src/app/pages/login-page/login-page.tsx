import { LoginUser } from '@guitar-shop/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserForm } from '../../components';
import { useAppDispatch } from '../../hooks/store.hooks';
import { loginUser } from '../../store/features/user/api-actions';
import { AppRoute } from '../../utils';

export function LoginPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const [ user, setUser ] = useState<LoginUser>({
    email: '',
    password: ''
  });

  const handleUserInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUser({ ...user, [ name ]: value });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Войти</h1>
          <p className="login__text">
            Hовый пользователь?
            <Link
              className="login__link"
              to={ AppRoute.Register }
            >
              Зарегистрируйтесь
            </Link>
            прямо сейчас
          </p>
          <UserForm
            isLoginPage={ true }
            user={ user }
            onInput={ handleUserInput }
            onSubmit={ handleSubmit }
          />
        </section>
      </div>
    </main>
  );
}

