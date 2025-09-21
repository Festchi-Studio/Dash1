import { getCurrentUser, logout } from "../auth/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div style={{marginTop: "2rem", textAlign: "center"}}>
      <h2>Dashboard</h2>
      <div>Welcome, <b>{user.username}</b>!<br/>Role: <b>{user.role}</b></div>
      <div style={{margin: "1rem"}}>
        <Link to="/user">User Page</Link>
      </div>
      <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
    </div>
  );
}