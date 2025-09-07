// src/components/Dashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // ✅ use API

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/auth/me")
      .then(res => {
        if (!res.data.loggedIn) navigate("/");
        else setAuth(true);
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  const handleLogout = async () => {
    await API.post("/api/auth/logout");
    navigate("/");
  };

  if (!auth) return <p>Checking session...</p>;

  return (
    <div>
      <h2>Welcome to Dashboard 🎉</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
