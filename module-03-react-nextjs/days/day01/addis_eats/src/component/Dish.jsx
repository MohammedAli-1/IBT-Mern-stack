import Card from "./Card";
import { useContext} from "react";
import { cartContext } from "../App";
import PropTypes from "prop-types";
function Dish({ id, name, price, isSlice, category, currency = "ETB", onAdd }) {
  const { cart, dispatch } = useContext(cartContext);
  // const user = useContext(userContext)
  const isIncart = cart.some((item) => item.id == id);
  return (
    <div className="card">
      <Card>
        <h1>{name}</h1>
        <p>
          {price} {currency}
        </p>
        <p>{category}</p>
        <em>{isSlice && "Slice"}</em>
        <button onClick={() => onAdd(price)}>Add</button>
        {!isIncart ? (
          <button
            onClick={() =>
              dispatch({
                type: "Add",
                payload: { id, name, price, isSlice, category },
              })
            }
          >
            AddtoCart
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch({
                type: "Remove",
                payload: { id },
              })
            }
          >
            RemoveCart
          </button>
        )}

        {/* <p>Quantity:{count}</p> */}
      </Card>
    </div>
  );
}
Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isSlice: PropTypes.bool,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;
