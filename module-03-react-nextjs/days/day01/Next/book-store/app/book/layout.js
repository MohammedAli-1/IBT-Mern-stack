import "./book-layout.css";

export default function BookLayouts({ children }) {
  return (
    <div className="book-layout">

      {/* LEFT SIDEBAR */}
      <aside className="book-sidebar">

        <h2>Categories</h2>

        <ul>
          <li>
            <a href="#">All Books</a>
          </li>

          <li>
            <a href="#">Fiction</a>
          </li>

          <li>
            <a href="#">Non-Fiction</a>
          </li>

          <li>
            <a href="#">Science</a>
          </li>

          <li>
            <a href="#">Technology</a>
          </li>

          <li>
            <a href="#">Business</a>
          </li>

          <li>
            <a href="#">History</a>
          </li>
        </ul>

      </aside>

      {/* RIGHT CONTENT */}
      <main className="book-content">
        {children}
      </main>
      

    </div>
  );
}