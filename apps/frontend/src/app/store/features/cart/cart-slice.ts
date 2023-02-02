import { Product } from '@guitar-shop/core';
import {
  EntityId,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  DEFAULT_ADD_TO_CART_QUANTITY,
  StoreNamespace,
} from '../../../app.constant';
import { CartCommodity, CartState, LoadingStatus, State } from '../../../types';
import { sendOrder } from './api-actions';

const cartAdapter = createEntityAdapter<CartCommodity>();

const initialState = cartAdapter.getInitialState<CartState>({
  sendOrderStatus: LoadingStatus.Idle,
});

export const cartSlice = createSlice({
  name: StoreNamespace.CartStore,
  initialState,
  reducers: {
    resetSendStatus: (state) => {
      state.sendOrderStatus = LoadingStatus.Idle;
    },
    addToCart: (state, { payload }: PayloadAction<Product>) => {
      const item = state.entities[payload.id as string];
      if (item) {
        item.quantity++;
      } else {
        state.ids.push(payload.id as string);
        state.entities[payload.id as string] = {
          product: payload,
          quantity: DEFAULT_ADD_TO_CART_QUANTITY,
        };
      }
    },
    incQuantity: (state, { payload: id }: PayloadAction<EntityId>) => {
      const item = state.entities[id];
      if (item) {
        item.quantity++;
      }
    },
    decrQuantity: (state, { payload: id }: PayloadAction<EntityId>) => {
      const item = state.entities[id];
      if (item) {
        item.quantity--;
        item.quantity === 0 && cartAdapter.removeOne(state, id);
      }
    },
    deleteCartItem: (state, { payload: id }: PayloadAction<EntityId>) => {
      const item = state.entities[id];
      if (item) {
        cartAdapter.removeOne(state, id);
      }
    },
    updateQuantity: (
      state,
      { payload }: PayloadAction<{ id: EntityId; quantity: number }>
    ) => {
      const item = state.entities[payload.id];
      if (item) {
        cartAdapter.updateOne(state, {
          id: payload.id,
          changes: { quantity: payload.quantity },
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.fulfilled, (state) => {
      state.sendOrderStatus = LoadingStatus.Succeeded;
      cartAdapter.removeAll(state);
    });
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  incQuantity,
  decrQuantity,
  deleteCartItem,
  updateQuantity,
  resetSendStatus
} = cartSlice.actions;

export const {
  selectAll: getCart,
  selectById: getCartItem,
  selectIds: getCartItemsIds,
} = cartAdapter.getSelectors((state: State) => state.cart);

export const getSendStatus = (state: State): LoadingStatus =>
  state[StoreNamespace.CartStore].sendOrderStatus;
