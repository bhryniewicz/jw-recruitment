import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { products } from "@/data/products";
import { loadDataFromLocalStorage, saveStockToStorage } from "../utils";

type ProductsState = {
  data: Product[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  data: loadDataFromLocalStorage("products", products),
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.data = products;
    },
    updateStock: (
      state,
      action: PayloadAction<{ id: string; change: number }>
    ) => {
      const { id, change } = action.payload;
      const product = state.data.find((p) => p.id === id);
      if (product) {
        product.in_stock += change;
        saveStockToStorage(state.data);
      }
    },
  },
});

export const { resetProducts, updateStock } = productsSlice.actions;
export default productsSlice.reducer;
