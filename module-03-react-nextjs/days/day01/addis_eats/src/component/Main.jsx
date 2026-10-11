import Menu from "./Menu";
function Main() {
  return (
    <main className="main">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🍽️ Addis Eats</span>

          <h1>Delicious Food, Made for You</h1>

          <p>
            Discover delicious meals, choose your favorite dishes, and build
            your order in just a few clicks.
          </p>

          <button className="hero-button">Explore Our Menu</button>
        </div>
      </section>

      {/* Menu Section */}
      <Menu />
    </main>
  );
}

export default Main;
