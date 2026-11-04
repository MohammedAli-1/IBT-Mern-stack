"use client";

import { useState } from "react";

function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bookId: "",
    quantity: 1,
  });

  const [serverErrors, setServerErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setServerErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await response.json();

      if (response.status === 422) {
        setServerErrors(data.fieldErrors || {});
        return;
      }

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }
      console.log("API Response:", data);
      setMessage(
        ` ${data.order.id} created successfully! ,Total Price:${data.order.totalPrice}`,
      );
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      {serverErrors.name && <p>{serverErrors.name[0]}</p>}

      <br />

      <label>Phone:</label>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />
      {serverErrors.phone && <p>{serverErrors.phone[0]}</p>}

      <br />

      <label>Book ID:</label>
      <input
        type="text"
        name="bookId"
        value={form.bookId}
        onChange={handleChange}
      />
      {serverErrors.bookId && <p>{serverErrors.bookId[0]}</p>}

      <br />

      <label>Quantity:</label>
      <input
        type="number"
        min="1"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      {serverErrors.quantity && <p>{serverErrors.quantity[0]}</p>}

      <br />

      <button type="submit">Place Order</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default CheckoutForm;
