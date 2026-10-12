import { Outlet } from "react-router";
import Header from "../component/Header";

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Addis Eats. All rights reserved.</p>
      </footer>
    </>
  );
}

export default MainLayout;
