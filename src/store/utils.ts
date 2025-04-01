import { Product } from "@/types/product";

type LocalStorageKeys = "products" | "cart";

export const loadDataFromLocalStorage = <T>(
  key: LocalStorageKeys,
  defaultValue: T[] = []
): T[] => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const saveStockToStorage = (data: Product[]) => {
  localStorage.setItem("products", JSON.stringify(data));
};
