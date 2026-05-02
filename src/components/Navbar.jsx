import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}