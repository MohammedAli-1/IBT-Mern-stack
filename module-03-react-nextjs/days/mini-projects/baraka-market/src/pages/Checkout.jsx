import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useShop } from "../context/ShopContext";
import { validate } from "../components/validate";

function Checkout() {
  const { cart, clearCart } = useShop();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [submiting, setSubmiting] = useState(false);
  const [severError, setServerError] = useState(false);
  const [touched, setTouched] = useState(false);
  const error = validate(formData);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(error).length > 0) {
      const firstFilterdError = Object.keys(error)[0];
      document.getElementById(firstFilterdError).focus();
      return;
    }
    if (submiting) return;
    setSubmiting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearCart();

      navigate("/order-success");
    } catch (error) {
      setServerError(error);
    } finally {
      setSubmiting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>

          <p>Please add products before checking out.</p>

          <Link to="/products">Browse Products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Customer Information</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              onBlur={() => setTouched(true)}
            />
          </div>
          {touched && error.fullName && <p>{error.fullName}</p>}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+251..."
              onBlur={() => setTouched(true)}
            />
            {touched && error.phone && <p>{error.phone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              onBlur={() => setTouched(true)}
            />
            {touched && error.email && <p>{error.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              placeholder="Enter your address"
              rows="4"
            />
            {touched && error.address && <p>{error.address}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>

            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              onBlur={() => setTouched(true)}
            />
            {touched && error.city && <p>{error.city}</p>}
          </div>
          <button
            type="submit"
            className="place-order-button"
            disabled={submiting}
          >
            {submiting ? "sending..." : "place order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((product) => (
            <div className="checkout-item" key={product.id}>
              <div>
                <h3>{product.title}</h3>

                <p>
                  {product.quantity} × ${product.price}
                </p>
              </div>

              <strong>${(product.price * product.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Checkout;
