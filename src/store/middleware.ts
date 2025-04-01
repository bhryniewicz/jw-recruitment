import { Middleware } from "@reduxjs/toolkit";
import { addToCart, removeFromCart } from "./cart";
import { updateStock } from "@/store/products";

export const middleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  const cartItems = state.cart.items;

  localStorage.setItem("cart", JSON.stringify(cartItems));

  if (addToCart.match(action)) {
    const { product, quantity } = action.payload;
    store.dispatch(updateStock({ id: product.id, change: -quantity }));
  }

  if (removeFromCart.match(action)) {
    const product = action.payload;
    store.dispatch(updateStock({ id: product.id, change: 1 }));
  }

  return result;
};
