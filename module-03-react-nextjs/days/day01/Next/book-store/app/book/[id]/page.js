import { books } from "../../Data/book.js";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./book-details.css";

export default async function BookDetails({ params }) {
  const { id } = await params;

  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
   notFound();
  }

  return (
    <main className="details-page">
      <div className="details-card">
        {/* Book Image */}
        <div className="details-image">
          <span>📚</span>
        </div>

        {/* Book Information */}
        <div className="details-info">
          <span className="details-category">{book.category}</span>

          <h1>{book.title}</h1>

          <p className="details-author">
            By <strong>{book.author}</strong>
          </p>

          <div className="details-rating">⭐ {book.rating} / 5</div>

          <p className="details-description">{book.description}</p>

          {/* Book information */}
          <div className="book-meta">
            <div>
              <strong>Pages</strong>
              <span>{book.pages}</span>
            </div>

            <div>
              <strong>Published</strong>
              <span>{book.year}</span>
            </div>

            <div>
              <strong>Language</strong>
              <span>{book.language}</span>
            </div>
          </div>

          {/* Price */}
          <div className="details-bottom">
            <div>
              <p className="price-label">Price</p>
              <p className="details-price">{book.price} ETB</p>
            </div>

            <button className="cart-button">Add to Cart</button>
          </div>

          <Link href="/book" className="back-link">
            ← Back to Books
          </Link>
        </div>
      </div>
    </main>
  );
}
