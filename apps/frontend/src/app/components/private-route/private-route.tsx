import { UserRole } from '@guitar-shop/core';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';
import { AppRoute } from '../../utils';

export interface PrivateRouteProps { }

export function PrivateRoute({ children }: PropsWithChildren<PrivateRouteProps>): JSX.Element {
  const user = useAppSelector(getUser);
  return (
    children && user && user.role === UserRole.Admin
      ? <>{ children }</>
      : <Navigate to={ AppRoute.Login } />
  );
}

