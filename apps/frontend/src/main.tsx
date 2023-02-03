import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';

import { StrictMode } from 'react';
import { App } from './app/app';
import { HistoryRouter } from './app/components/history-router/history-router';
import { browserHistory } from './app/services/browser-history.service';
import { fetchProducts } from './app/store/features/product/api-actions';
import { checkUser } from './app/store/features/user/api-actions';

store.dispatch(checkUser());
store.dispatch(fetchProducts());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={ store }>
      <HistoryRouter history={ browserHistory }>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>
);
