import { Route, Routes } from 'react-router-dom';
import { AppRoute } from './app.constant';
import { Layout } from './components';
import { AuthPage, MainPage } from './pages';



export function App() {
  return (
    <Routes>
      <Route path={ AppRoute.Root } element={ <Layout /> }>
        <Route index
          element={ <MainPage /> }
        />
        <Route path={ AppRoute.Register } element={ <AuthPage /> } />
        <Route path={ AppRoute.Login } element={ <AuthPage /> } />
      </Route>
    </Routes>
  );
}
