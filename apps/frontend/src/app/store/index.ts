import { configureStore } from '@reduxjs/toolkit';
import { StoreNamespace } from '../app.constant';
import { createApi } from '../services/api.service';
import productReducer from './features/product/product-slice';
import userReducer from './features/user/user-slice';

export const store = configureStore({
  reducer: {
    [StoreNamespace.ProductStore]: productReducer,
    [StoreNamespace.UserStore]: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createApi(),
      },
    }),
});
