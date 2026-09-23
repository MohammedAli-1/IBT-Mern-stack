import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <h2>Welcome to BarakaMarket</h2>

      <p>Discover useful Islamic products, books, clothing, gifts, and more.</p>

      <button onClick={() => navigate("/products")}>Explore Products</button>
    </main>
  );
}

export default Home;
