import Card from "./Card";

function Dish({ name, price, isSlice, category }) {
  return (
    <Card>
      <div className="card">
        <h2>{name}</h2>
        <h2>{price} </h2>
        <p> {category}</p>
        <p> {isSlice && "slice"}</p>
      </div>
    </Card>
  );
}
export default Dish;
