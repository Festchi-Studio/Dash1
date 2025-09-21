import { useState } from "react";
import { login } from "../auth/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = login(username, password);
    if (user) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 320, margin: "4rem auto", display: "flex", flexDirection: "column", gap: 12}}>
      <h2>Login</h2>
      <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <div style={{color:"red"}}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}