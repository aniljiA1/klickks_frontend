import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://klickks-backend-2.onrender.com/api/auth/me", { withCredentials: true })
      .then(res => {
        if (!res.data.loggedIn) navigate("/");
        else setAuth(true);
      });
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post("https://klickks-backend-2.onrender.com/api/auth/logout", {}, { withCredentials: true });
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
