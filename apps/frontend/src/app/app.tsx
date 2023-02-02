import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { AuthPage, CartPage, MainPage, NotFoundPage, ProductPage } from './pages';
import { AppRoute } from './utils';



export function App() {
  return (
    <Routes>
      <Route path={ AppRoute.Root } element={ <Layout /> }>
        <Route index
          element={ <MainPage /> }
        />
        <Route path={ AppRoute.Register } element={ <AuthPage /> } />
        <Route path={ AppRoute.Login } element={ <AuthPage /> } />
        <Route path={ AppRoute.Cart } element={ <CartPage /> } />
        <Route path={ `${AppRoute.Product}/:productId` } element={ <ProductPage /> } />
        <Route path={ AppRoute.NotFound } element={ <NotFoundPage /> } />
      </Route>
    </Routes>
  );
}
