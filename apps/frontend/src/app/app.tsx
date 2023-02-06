import { Route, Routes } from 'react-router-dom';
import { Layout, PrivateRoute } from './components';
import { CartPage, CommoditiesPage, LoginPage, MainPage, NewProductPage, NotFoundPage, OrderPage, OrdersPage, ProductPage, RegisterPage } from './pages';
import { EditProductPage } from './pages/edit-product-page/edit-product-page';
import { AppRoute } from './utils';

export function App() {
  return (
    <Routes>
      <Route path={ AppRoute.Root } element={ <Layout /> }>
        <Route index
          element={ <MainPage /> }
        />
        <Route path={ AppRoute.Register } element={ <RegisterPage /> } />
        <Route path={ AppRoute.Login } element={ <LoginPage /> } />
        <Route path={ AppRoute.Cart } element={ <CartPage /> } />
        <Route path={ `${AppRoute.Product}/:productId` } element={ <ProductPage /> } />
        <Route path={ AppRoute.NotFound } element={ <NotFoundPage /> } />

        <Route path={ AppRoute.Commodities }>
          <Route index element={
            <PrivateRoute>
              <CommoditiesPage />
            </PrivateRoute>
          } />
          <Route path={ `${AppRoute.NewProduct}` } element={
            <PrivateRoute>
              <NewProductPage />
            </PrivateRoute>
          } />
          <Route path={ `:productId` } element={
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          } />
        </Route>

        <Route path={ AppRoute.Orders } element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        } />
        <Route path={ `${AppRoute.Orders}/:orderId` } element={
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        } />
        <Route path={ AppRoute.NotFound } element={ <NotFoundPage /> } />
      </Route>
    </Routes>
  );
}
