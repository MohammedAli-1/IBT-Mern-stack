import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useShop();
  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <main className="cart-page">
      <h1>🛒 My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>Add some products to your cart.</p>

          <Link to="/products">Browse Products</Link>
        </div>
      ) : (
        <div className="cart-list">
          {cart.map((product) => (
            <article className="cart-item" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <div className="cart-item-info">
                <h2>{product.title}</h2>

                <p>${product.price}</p>

                <div className="cart-quantity">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="btn"
                  >
                    −
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="btn"
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-cart-button"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>

              <strong className="cart-item-total">
                ${(product.price * product.quantity).toFixed(2)}
              </strong>
            </article>
          ))}
          <div className="cart-summary">
            <h2>Cart Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="summary-row">
              <span>Total Price</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
