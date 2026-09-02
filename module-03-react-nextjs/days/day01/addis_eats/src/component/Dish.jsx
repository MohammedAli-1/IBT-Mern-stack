function Dish({ name, price }) {
  return (
    <div className="card">
      <h1>{name}</h1>
      <p>{price}</p>
    </div>
  );
}

export default Dish;
