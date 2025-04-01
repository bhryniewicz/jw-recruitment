import { ChevronLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { AddProductForm } from "@/components/AddProductsForm";
import { FormValues } from "@/components/AddProductsForm/schema";
import { useProduct } from "@/hooks/useProduct";

export const ProductDetails = () => {
  const { id: productId } = useParams();

  const { product, isLoading, error } = useProduct(productId as string);

  const { addProduct } = useCart();

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) return <Navigate to="/404" />;

  const { desciption, image, in_stock, name, price } = product;

  const onSubmit = (data: FormValues) => {
    const { productToCard } = data;
    addProduct(product, productToCard);
  };

  return (
    <div className="container mx-auto px-8 md:px-32 py-8">
      <Link to="/" className="flex gap-2">
        <ChevronLeft /> Cofnij do produktów
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
        <div className="flex flex-col gap-4">
          <h1>{name}</h1>
          <img
            src={image}
            alt="product image"
            className="w-[300px] h-[400px] object-cover"
          />
          <p>{desciption}</p>
        </div>
        <div>
          <h2 className=" text-right text-3xl text-gray-500 font-bold">
            {price} PLN
          </h2>
          <h3 className="text-right">W magazynie: {in_stock}</h3>
          <AddProductForm onSubmit={onSubmit} inStock={in_stock} />
        </div>
      </div>
    </div>
  );
};
