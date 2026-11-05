import { Link } from "react-router-dom";
import "./OrderSucess.css";
function OrderSuccess() {
  return (
    <main className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for your order. Your order has been received successfully.
        </p>

        <div className="success-actions">
          <Link to="/products">Continue Shopping</Link>

          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
