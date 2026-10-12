import useCartStore from "../store/cartStore";

function CartSection() {
  const cart = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function onIncrease(id) {
    const item = cart.find((item) => item.id === id);

    if (item) {
      addItem(item);
    }
  }

  function onDecrease(id) {
    const item = cart.find((item) => item.id === id);

    if (item && item.quantity > 1) {
      useCartStore.setState((state) => ({
        items: state.items.map((current) =>
          current.id === id
            ? { ...current, quantity: current.quantity - 1 }
            : current,
        ),
      }));
    } else if (item) {
      removeItem(id);
    }
  }

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

            <button onClick={() => removeItem(item.id)}>Remove</button>
          </article>
        ))
      )}

      <h3>Cart total: {total} ETB</h3>
    </section>
  );
}

export default CartSection;
