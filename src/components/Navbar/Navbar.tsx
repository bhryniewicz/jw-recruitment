import { useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { ShoppingCartIcon } from "lucide-react";
import { Cart } from "@/components/Cart/Cart";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router";

export const Navbar = () => {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const productsInCart = useMemo(
    () =>
      items.reduce((totalQuantity, { quantity }) => {
        return (totalQuantity += quantity);
      }, 0),
    [items]
  );

  return (
    <header className="container mx-auto px-32 flex justify-between items-center py-8">
      <Link to="/">
        <h1 className="font-bold">My Shop</h1>
      </Link>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex gap-2">
            <ShoppingCartIcon
              color={items.length > 0 ? "#db4dff" : "black"}
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            {productsInCart}
          </div>
        </DialogTrigger>
        <DialogContent className="w-[400px] max-h-[500px] overflow-y-scroll">
          <DialogTitle className="text-lg font-semibold mb-4">
            Koszyk
          </DialogTitle>
          <Cart setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </header>
  );
};
