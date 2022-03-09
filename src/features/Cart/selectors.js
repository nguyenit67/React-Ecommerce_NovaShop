import { createSelector } from '@reduxjs/toolkit';

const selectCartItems = (state) => state.cart.cartItems;

// Count number of products in cart
export const selectCartItemsCount = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Sum total of products sale price in cart
export const selectCartTotal = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0)
);