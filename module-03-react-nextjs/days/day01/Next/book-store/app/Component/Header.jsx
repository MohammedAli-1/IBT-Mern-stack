import Link from "next/link";
import Navbar from "./Navbar";
import "./navbar.css";
export default function Header() {
  return (
    <header className="site-header">
      <Navbar />
    </header>
  );
}
