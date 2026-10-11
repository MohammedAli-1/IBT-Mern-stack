function CartSection({ cart, total, onIncrease, onDecrease, onRemove }) {
  return (
    <section>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <article key={item.id} className="dish-card">
            <h3>{item.name}</h3>

            <p>Price: {item.price} ETB each</p>

            <div className="quantity-controls">
              <button onClick={() => onDecrease(item.id)}>−</button>

              <span>{item.quantity}</span>

              <button onClick={() => onIncrease(item.id)}>+</button>
            </div>

            <p>Subtotal: {item.price * item.quantity} ETB</p>

            <button onClick={() => onRemove(item.id)}>Remove</button>
          </article>
        ))
      )}

      <h3>Cart total: {total} ETB</h3>
    </section>
  );
}

export default CartSection;
