import Card from "./Card";
import { useState } from "react";
import { PropTypes } from "prop-types";
function Dish({ name, price, isSlice, category, currency = "ETB", onAdd }) {
  // const [count, setCount] = useState(0);
  // function Add() {
  //   return setCount(count + 1);
  // }
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
