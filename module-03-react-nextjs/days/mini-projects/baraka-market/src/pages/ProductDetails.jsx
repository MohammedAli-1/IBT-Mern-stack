import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./productDetails.css";
import { getProductById } from "../api/productApi";
import { useShop } from "../context/ShopContext";

function ProductDetails() {
  const { id } = useParams();
  const { wishlist, setWishlist, addToCart } = useShop();
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);
  function addToWishlist() {
    const alreadyExists = wishlist.some((item) => item.id === product.id);

    if (alreadyExists) {
      return;
    }

    setWishlist([...wishlist, product]);
  }

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main className="product-details-page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-details">
        <div className="product-details-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product-details-info">
          <span className="product-category">{product.category}</span>

          <h1>{product.title}</h1>

          <div className="product-rating">⭐ {product.rating}</div>

          <p className="product-description">{product.description}</p>

          <h2 className="product-price">${product.price}</h2>

          <div className="product-stock">{product.stock} items available</div>

          <div className="product-actions">
            <button onClick={addToWishlist}>❤️ Add to Wishlist</button>

            <button onClick={() => addToCart(product)}>🛒 Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
