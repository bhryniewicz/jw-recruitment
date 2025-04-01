import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";
import { loadDataFromLocalStorage } from "../utils";
import { products } from "@/data/products";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: loadDataFromLocalStorage<CartItem>("cart"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.product.in_stock -= quantity;
      } else {
        state.items.push({
          product: { ...product, in_stock: product.in_stock - quantity },
          quantity,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.product.id !== product.id
          );
        } else {
          existingItem.quantity -= 1;
        }

        const updatedProduct = state.items.find(
          (item) => item.product.id === product.id
        );
        if (updatedProduct) {
          updatedProduct.product.in_stock += 1;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
      localStorage.setItem("products", JSON.stringify(products));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
