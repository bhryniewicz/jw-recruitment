import { FC, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ListPlusIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

export const ProductsList: FC = () => {
  const { products, isLoading, error, loadMore, areAllProductsVisible } =
    useProducts();
  const { addProduct } = useCart();

  const handleAddProductToCart = (e: SyntheticEvent, productId: Product) => {
    e.stopPropagation();
    addProduct(productId, 1);
  };

  if (isLoading) return <h1>Ładowanie produktów</h1>;
  if (error) return <h1>Błąd: {error}</h1>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {products?.map((prod) => {
          const { id, image, name, price, in_stock } = prod;
          return (
            <div
              key={id}
              className="border border-gray-50 group overflow-hidden shadow-lg cursor-pointer"
            >
              <Link to={`/products/${id}`}>
                <div className="h-[300px] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="flex justify-between items-center p-6 border-t border-gray-530">
                <div className="flex flex-col gap-2">
                  <h2>{name}</h2>
                  <p className="text-xs text-gray-400">{price} PLN</p>
                </div>
                <Button
                  disabled={in_stock === 0}
                  className="cursor-pointer"
                  onClick={(e) => handleAddProductToCart(e, prod)}
                >
                  <ListPlusIcon />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {!areAllProductsVisible && (
        <div className="w-full flex justify-center my-4 ">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            className="self-center"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </>
  );
};
