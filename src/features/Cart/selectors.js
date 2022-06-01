import { createSelector } from '@reduxjs/toolkit';

export const selectCartItems = (state) => state.cart.cartItems;

// Count number of products in cart
export const selectCartItemsCount = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Sum total of products sale price in cart
export const selectCartTotal = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);

// Number of different products (distinguish by productId)

export const selectCartItemsLength = createSelector(
  selectCartItems,
  (cartItems) => cartItems.length
);
