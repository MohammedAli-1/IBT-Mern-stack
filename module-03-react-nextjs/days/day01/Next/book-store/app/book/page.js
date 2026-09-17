import Link from "next/link.js";
import { books } from "../Data/book.js";
import "./books.css";
// import { resolve } from "styled-jsx/css";

export default async function Books() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  throw new Error("faild to load data");
  return (
    <main className="books-page">
      <h1 className="books-title">Welcome to Book Page</h1>

      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-image">📚</div>

            <div className="book-info">
              <h2>{book.title}</h2>

              <p className="book-author">By {book.author}</p>

              <span className="book-category">{book.category}</span>

              <div className="book-bottom">
                <p className="book-price">{book.price} ETB</p>

                <Link className="book-button" href={`/book/${book.id}`}>
                  View Book
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
