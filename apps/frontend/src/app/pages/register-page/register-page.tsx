import { NewUser } from '@guitar-shop/core';
import { ChangeEvent, FormEvent, useState } from 'react';
import { UserForm } from '../../components';
import { useAppDispatch } from '../../hooks/store.hooks';
import { registerUser } from '../../store/features/user/api-actions';


export function RegisterPage() {
  const dispatch = useAppDispatch();

  const [ user, setUser ] = useState<NewUser>({
    userName: '',
    email: '',
    password: ''
  });

  const handleUserInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUser({ ...user, [ name ]: value });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <UserForm
            user={ user }
            isLoginPage={ false }
            onInput={ handleUserInput }
            onSubmit={ handleSubmit }
          />
        </section>
      </div>
    </main>
  );
}

