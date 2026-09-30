import Link from "next/link";
export function BookCard({ book }) {
  return (
    <div className="book-card">
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
  );
}
