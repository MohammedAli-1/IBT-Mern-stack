import CartSection from "../component/Cart";

function Cart({ cart, total, onIncrease, onDecrease, onRemove }) {
  return (
    <section>
      <CartSection
        cart={cart}
        total={total}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
      />
    </section>
  );
}

export default Cart;
