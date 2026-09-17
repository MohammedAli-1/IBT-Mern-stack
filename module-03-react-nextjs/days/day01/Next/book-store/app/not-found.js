import Link from "next/link";
import "../app/book/[id]/book-details.css";
export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <h1>Book Not Found</h1>
        <p>The book you are looking for does not exist.</p>

        <Link href="/book">Back to Books</Link>
      </div>
    </>
  );
}
