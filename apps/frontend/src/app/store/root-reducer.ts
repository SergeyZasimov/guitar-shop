import { combineReducers } from '@reduxjs/toolkit';
import { StoreNamespace } from '../app.constant';
import cartReducer from './features/cart/cart-slice';
import productReducer from './features/product/product-slice';
import userReducer from './features/user/user-slice';

export const rootReducer = combineReducers({
  [StoreNamespace.ProductStore]: productReducer,
  [StoreNamespace.UserStore]: userReducer,
  [StoreNamespace.CartStore]: cartReducer,
});
