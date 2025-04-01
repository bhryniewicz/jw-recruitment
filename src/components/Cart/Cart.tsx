import { useCart } from "@/hooks/useCart";
import { Button } from "../ui/button";
import { FC, useMemo } from "react";
import { resetProducts } from "@/store/products/productsSlice";
import { useDispatch } from "react-redux";

interface CartProps {
  setIsOpen: (value: boolean) => void;
}

export const Cart: FC<CartProps> = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const { items, addProduct, removeProduct, clearProducts } = useCart();

  const handleClearProducts = () => {
    clearProducts();
    dispatch(resetProducts());
    setIsOpen(false);
  };

  const totalPrice = useMemo(
    () =>
      items.reduce((total, { product: { price }, quantity }) => {
        return total + price * quantity;
      }, 0),
    [items]
  );

  return (
    <div>
      {items.length === 0 ? (
        <p className="mb-4">Koszyk jest pusty</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(
            ({ product, product: { id, name, price, in_stock }, quantity }) => {
              console.log(in_stock, "stock");
              return (
                <div key={id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2>{name}</h2>
                      <p>Quantity: {quantity}</p>
                    </div>
                    <p className="text-xs text-gray-600">{price} pln</p>
                  </div>
                  <Button
                    disabled={in_stock === 0}
                    onClick={() => addProduct(product, 1)}
                  >
                    +
                  </Button>
                  <Button onClick={() => removeProduct(product)}>-</Button>
                </div>
              );
            }
          )}
        </div>
      )}
      {totalPrice !== 0 && (
        <p className="my-4 font-bold">Kwota calkowita: {totalPrice} pln</p>
      )}
      <Button onClick={handleClearProducts}>Buy</Button>
    </div>
  );
};
