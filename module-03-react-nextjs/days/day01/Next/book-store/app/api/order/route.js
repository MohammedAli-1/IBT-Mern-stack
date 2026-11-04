import { orderScheme } from "@/lib/schema";
import { getBookById } from "@/lib/books";
export async function POST(request) {
  const body = await request.json();
  const result = orderScheme.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        message: "Validation faild",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }
  const book = await getBookById(body.bookId);
  if (!book) {
    return Response.json({ errors: "Book not Found" }, { status: 404 });
  }
  const totalPrice = book.price * body.quantity;
  const order = {
    id: `order-${Date.now()}`,
    name: body.name,
    phone: body.phone,
    quantity: body.quantity,
    totalPrice: totalPrice,
    createdAt: new Date().toString(),
  };
  return Response.json(
    {
      message: "order created Sucessfully",
      order,
    },
    {
      status: 201,
    },
  );
}
