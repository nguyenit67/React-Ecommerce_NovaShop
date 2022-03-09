import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
  },
  reducers: {
    showMiniCart: (state) => {
      state.showMiniCart = true;
    },
    hideMiniCart: (state) => {
      state.showMiniCart = false;
    },
  },
});

const { actions, reducer: cartReducer } = cartSlice;
export const { showMiniCart, hideMiniCart } = actions;

export default cartReducer;
