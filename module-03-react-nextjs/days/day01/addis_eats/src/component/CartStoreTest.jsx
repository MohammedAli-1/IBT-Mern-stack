import useCartStore from "../store/cartStore";

function CartStoreTest() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const testFood = {
    id: 999,
    name: "Test Burger",
    price: 320,
  };

  return (
    <section>
      <h2>Zustand Cart Test</h2>

      <p>Items in cart: {items.length}</p>

      <button onClick={() => addItem(testFood)}>Add Test Burger</button>

      <button onClick={() => removeItem(999)}>Remove Test Burger</button>

      <button onClick={clearCart}>Clear Cart</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity} × {item.price} ETB
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CartStoreTest;
