import { useRef, useState } from "react";
import useCartStore from "../store/cartStore";
import "./checkout.css";
function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your full name.";
  }

  const phone = form.phone.trim();

  if (!phone) {
    errors.phone = "Please enter your TeleBirr phone number.";
  } else if (!/^(\+2519\d{8}|09\d{8})$/.test(phone)) {
    errors.phone =
      "Enter a valid Ethiopian mobile number, e.g. 0912345678 or +251912345678.";
  }

  if (!form.area) {
    errors.area = "Please select a delivery area.";
  }

  return errors;
}

function Checkout() {
  const items = useCartStore((state) => state.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // All customer-entered values live in one state object.
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);

  const fieldRefs = {
    name: nameRef,
    phone: phoneRef,
    area: areaRef,
  };

  // Validate during render.
  const errors = validate(form);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    // Clear the previous request failure when the user edits.
    setRequestError("");
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Mark every required field as visited on submission.
    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    const currentErrors = validate(form);
    const firstError = Object.keys(currentErrors)[0];

    if (firstError) {
      fieldRefs[firstError]?.current?.focus();
      return;
    }

    setSubmitting(true);
    setRequestError("");

    try {
      // Simulate a request that fails.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      throw new Error(
        "Checkout service is temporarily unavailable. Your order was not submitted. Please try again.",
      );
    } catch (error) {
      setRequestError(error.message);

      // Keep all form values and focus the first invalid field,
      // if one exists after validation.
      const latestErrors = validate(form);
      const firstInvalidField = Object.keys(latestErrors)[0];

      if (firstInvalidField) {
        fieldRefs[firstInvalidField]?.current?.focus();
      }
    } finally {
      setSubmitting(false);
    }
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full name</label>

          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? "name-error" : undefined}
          />

          {showError("name") && (
            <p id="name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">TeleBirr phone number</label>

          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0912345678"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError("phone"))}
            aria-describedby={showError("phone") ? "phone-error" : undefined}
          />

          {showError("phone") && (
            <p id="phone-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="area">Delivery area</label>

          <select
            ref={areaRef}
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError("area"))}
            aria-describedby={showError("area") ? "area-error" : undefined}
          >
            <option value="">Select your delivery area</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>

          {showError("area") && (
            <p id="area-error" role="alert">
              {errors.area}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional notes (optional)</label>

          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid="false"
          />
        </div>

        <section className="checkout-summary">
          <h2>Order summary</h2>
          <p>Items: {items.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <p>Total: {total} ETB</p>
        </section>

        {requestError && (
          <p role="alert" className="checkout-error">
            {requestError}
          </p>
        )}

        <button
          type="submit"
          className="place-order-button"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : `Place order — ${total} ETB`}
        </button>
      </form>
    </main>
  );
}

export default Checkout;
