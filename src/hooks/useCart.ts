import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "@/store/cart/cartSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Product } from "@/types/product";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const addProduct = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }));
  };

  const removeProduct = (prod: Product) => {
    dispatch(removeFromCart(prod));
  };

  const clearProducts = () => {
    dispatch(clearCart());
  };

  return { items, addProduct, removeProduct, clearProducts };
};
