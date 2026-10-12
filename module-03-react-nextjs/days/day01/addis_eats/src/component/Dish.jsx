import { memo } from "react";
import { Link } from "react-router";
function Dish({ id, name, category, price, isSlice, onAddToCart }) {
  return (
    <article className="dish-card">
      <h3>{name}</h3>

      <p>Category: {category}</p>

      {isSlice && <span>🍕 Available by slice</span>}

      <p>Price: {price} ETB</p>

      <button
        onClick={() => onAddToCart({ id, name, category, price, isSlice })}
      >
        Add to Cart
      </button>
      <Link to={`/foods/${id}`} className="details-link">
        View Details
      </Link>
    </article>
  );
}

export default memo(Dish);
