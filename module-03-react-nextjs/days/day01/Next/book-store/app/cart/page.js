"use client";

import "./cart.css";
import { useCart } from "../Component/cartProvider";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (total, book) => total + Number(book.price),
    0,
  );

  return (
    <main className="cart">
      <h1>Shopping Cart</h1>
      <p>Review your selected books before checkout.</p>

      {cart.length > 0 ? (
        <>
          <p>{cart.length} items in your cart</p>

          <div className="cart-items">
            {cart.map((book, index) => (
              <div className="cart-item" key={`${book.id}-${index}`}>
                <div>
                  <h2>{book.title}</h2>
                  <p className="book-price">{book.price} ETB</p>
                  <span className="book-category">{book.category}</span>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(book.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              <span>Total Price</span>
              <strong>{totalPrice.toLocaleString()} ETB</strong>
            </p>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <div className="empty-icon">📚</div>
          <h2>Your cart is empty</h2>
          <p>
            You haven't added any books yet. Explore our collection and find
            your next favorite book.
          </p>

          <Link href="/book" className="browse-button">
            Browse Books
          </Link>
        </div>
      )}
    </main>
  );
}
