import { books } from "../Data/book.js";
import "./books.css";
import { BookCard } from "../Component/bookCard.jsx";
// import { resolve } from "styled-jsx/css";

export default async function Books() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("faild to load data");
  return (
    <main className="books-page">
      <h1 className="books-title">Welcome to Book Page</h1>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
