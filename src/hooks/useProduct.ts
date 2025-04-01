import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useProduct = (productId: string) => {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  const product = data.find((prod) => prod.id === productId);

  if (!product) return { error };

  return { product, isLoading };
};
