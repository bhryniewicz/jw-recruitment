import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema, FormValues } from "@/components/AddProductsForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";

interface AddProductFormProps {
  inStock: number;
  onSubmit: SubmitHandler<FormValues>;
}

export const AddProductForm: FC<AddProductFormProps> = ({
  inStock,
  onSubmit,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(inStock)),
    defaultValues: {
      productToCard: 0,
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    form.reset({ productToCard: 0 });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productToCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ilość</FormLabel>
              <FormControl>
                <Input
                  placeholder="Wpisz liczbe, jaka chcesz dodac do koszyka"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Dodaj do koszyka</Button>
      </form>
    </Form>
  );
};
