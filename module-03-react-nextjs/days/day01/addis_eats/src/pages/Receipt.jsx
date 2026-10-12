import { useNavigate } from "react-router-dom";

function Receipt() {
  const navigate = useNavigate();

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <span className="checkout-eyebrow">ADDIS EATS</span>
        <h1>Order Receipt</h1>
        <p>Your receipt will appear here after an order is confirmed.</p>
      </div>

      <button
        type="button"
        className="checkout-secondary-button"
        onClick={() => navigate("/")}
      >
        Back to Menu
      </button>
    </main>
  );
}

export default Receipt;
