import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const PAGE_SIZE = 6;

export const useProducts = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  const visibleProducts = data.slice(0, visibleCount);
  const areAllProductsVisible = visibleCount >= data.length;

  const loadMore = () => {
    if (visibleCount < data.length) {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
  };

  return {
    products: visibleProducts,
    isLoading,
    error,
    loadMore,
    areAllProductsVisible,
  };
};
