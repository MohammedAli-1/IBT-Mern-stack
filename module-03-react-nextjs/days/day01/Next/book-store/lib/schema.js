import z from "zod";
export const orderScheme = z.object({
  name: z.string().min(2, "Name must be atleast 2 character").max(100),
  phone: z.string().regex(/^(09)\d{8}$/, "use 09xxxxxxx format"),
  bookId: z.string().min(1, "book id required"),
  quantity: z.number().positive("quantity must be a positive number").int(),
});
