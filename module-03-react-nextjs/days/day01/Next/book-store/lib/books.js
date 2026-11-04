import { books } from "@/app/Data/book";
import { reviews } from "@/app/Data/review";
export async function getBook() {
  await new Promise((res) => setTimeout(res, 2000));

  return books;
}
export async function getBookById(id) {
  await new Promise((res) => setTimeout(res, 2000));
  const book = books.find((book) => book.id === parseInt(id));
  return book;
}
export async function getReviewById(id) {
  await new Promise((res) => setTimeout(res, 2000));
  const review = reviews.filter((review) => review.bookId === parseInt(id));
  return review;
}
