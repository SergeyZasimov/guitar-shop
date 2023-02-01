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
import { CartCommodity, State } from '../../../types';

const cartAdapter = createEntityAdapter<CartCommodity>();

const initialState = cartAdapter.getInitialState();

export const cartSlice = createSlice({
  name: StoreNamespace.CartStore,
  initialState,
  reducers: {
    addToCart: {
      reducer(
        state: typeof initialState,
        action: PayloadAction<CartCommodity>
      ) {
        cartAdapter.addOne(state, action.payload);
      },
      prepare(product: Product) {
        return {
          payload: {
            id: product.id,
            product,
            quantity: DEFAULT_ADD_TO_CART_QUANTITY,
          },
        };
      },
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
});

export default cartSlice.reducer;
export const { addToCart, incQuantity, decrQuantity, deleteCartItem, updateQuantity } =
  cartSlice.actions;

export const {
  selectAll: getCart,
  selectById: getCartItem,
  selectIds: getCartItemsIds,
} = cartAdapter.getSelectors((state: State) => state.cart);
