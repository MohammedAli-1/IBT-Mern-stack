import { getBookById } from "@/lib/books";
export async function GET(request, { params }) {
  const { id } = await params;
  const book = await getBookById(id);
  return Response.json(book);
}
