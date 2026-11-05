import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Wishlist.css";
function Wishlist() {
  const { wishlist, setWishlist } = useShop();

  function removeFromWishlist(id) {
    const updatedWishlist = wishlist.filter((product) => product.id !== id);

    setWishlist(updatedWishlist);
  }

  return (
    <main className="wishlist-page">
      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>

          <p>Add products you like to your wishlist.</p>

          <Link to="/products">Browse Products</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <div className="wishlist-card-content">
                <h2>{product.title}</h2>

                <p>{product.description}</p>

                <strong>${product.price}</strong>

                <div className="wishlist-actions">
                  <Link to={`/products/${product.id}`}>View Product</Link>

                  <button onClick={() => removeFromWishlist(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
