import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

export default ThemeToggle;
