import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{textAlign: "center", marginTop: "4rem"}}>
      <h1>Welcome to the Dashboard App</h1>
      <p>This is a demo dashboard with multi-page navigation and secure role-based access.</p>
      <Link to="/login">Login</Link>
    </div>
  );
}