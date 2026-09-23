import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <div className="product-card-content">
        <h3>{product.title}</h3>

        <p>{product.description}</p>

        <div className="product-card-bottom">
          <strong>${product.price}</strong>

          <Link to={`/products/${product.id}`} className="product-view-button">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
