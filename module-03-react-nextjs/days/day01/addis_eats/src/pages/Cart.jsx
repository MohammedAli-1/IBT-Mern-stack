import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import "./checkout.css";
function CartSection() {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function onIncrease(id) {
    const item = cart.find((item) => item.id === id);

    if (item) {
      addItem(item);
    }
  }

  function onDecrease(id) {
    const item = cart.find((item) => item.id === id);

    if (!item) return;

    if (item.quantity > 1) {
      useCartStore.setState((state) => ({
        items: state.items.map((current) =>
          current.id === id
            ? { ...current, quantity: current.quantity - 1 }
            : current,
        ),
      }));
    } else {
      removeItem(id);
    }
  }

  return (
    <main className="checkout-page cart-page">
      <div className="checkout-heading">
        <span className="checkout-eyebrow">ADDIS EATS</span>
        <h1>Your Cart</h1>
        <p>Review your delicious choices before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">
            🛒
          </span>
          <h2>Your cart is empty</h2>
          <p>Add something delicious from our menu to get started.</p>
          <button
            type="button"
            className="checkout-secondary-button"
            onClick={() => navigate("/")}
          >
            Browse Menu
          </button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>{item.price} ETB each</p>
                  <strong>
                    {(item.price * item.quantity).toLocaleString()} ETB
                  </strong>
                </div>

                <div className="cart-item-actions">
                  <div
                    className="quantity-controls"
                    aria-label={`Quantity of ${item.name}`}
                  >
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => onDecrease(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => onIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-item-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-line">
              <span>Items</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>

            <div className="summary-line summary-total">
              <span>Total</span>
              <strong>{total.toLocaleString()} ETB</strong>
            </div>

            <button
              type="button"
              className="place-order-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="checkout-secondary-button"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <p className="summary-note">Your cart is saved in this browser.</p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartSection;
