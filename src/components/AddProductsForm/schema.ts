import { z } from "zod";

export const formSchema = (in_stock: number) =>
  z.object({
    productToCard: z.coerce
      .number()
      .gt(0, { message: "Wpisana ilość musi byc większa niz 1" })
      .refine((val) => val <= in_stock, {
        message: `Nie mozna dodac takiej ilosci. Wpisz prawidlowa wartosc`,
      }),
  });

export type FormValues = z.infer<ReturnType<typeof formSchema>>;
