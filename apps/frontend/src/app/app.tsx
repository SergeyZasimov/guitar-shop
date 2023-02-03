import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute } from './components';
import { AuthPage, CartPage, CommoditiesPage, MainPage, NotFoundPage, ProductPage } from './pages';
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
        <Route path={ AppRoute.Commodities } element={
          <PrivateRoute>
            <CommoditiesPage />
          </PrivateRoute>
        } />
        <Route path={ AppRoute.NotFound } element={ <NotFoundPage /> } />
      </Route>
    </Routes>
  );
}
