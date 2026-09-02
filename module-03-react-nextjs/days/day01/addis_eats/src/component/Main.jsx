import Dish from "./Dish";
function Main() {
  const menu = [
    { id: 1, name: "Doro Wat", price: 240 },
    { id: 2, name: "Shiro", price: 120 },
    { id: 3, name: "Tibs", price: 280 },
  ];
  return (
    <div >
      {menu.map((item) => {
        return <Dish key={item.id} name={item.name} price={item.price} />;
      })}
    </div>
  );
}

export default Main;
