import { useParams, Link } from "react-router";
import useFetch from "../hooks/useFetch";

function FoodDetails() {
  const { id } = useParams();
  const { data: menu, loading, error } = useFetch("/menu.json");

  if (loading) return <p>Loading food details...</p>;
  if (error) return <p>Could not load food details.</p>;

  const food = menu.find((item) => item.id === Number(id));

  if (!food) {
    return (
      <section>
        <h2>Food Not Found</h2>
        <Link to="/">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{food.name}</h2>
      <p>Category: {food.category}</p>
      <p>Price: {food.price} ETB</p>
      <p>Available by slice: {food.isSlice ? "Yes" : "No"}</p>
      <Link to="/">Back to Menu</Link>
    </section>
  );
}

export default FoodDetails;
