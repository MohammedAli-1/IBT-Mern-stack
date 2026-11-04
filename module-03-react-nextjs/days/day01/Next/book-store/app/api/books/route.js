import { getBook } from "@/lib/books";
export async function GET(request) {
  const book = await getBook();

  const category = new URL(request.url).searchParams.get("category");
  if (!category) {
    return Response.json(book);
  } 
  const filteredBooks = book.filter((book) => book.category === category);
  return Response.json(filteredBooks);
}
