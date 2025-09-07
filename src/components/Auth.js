// src/components/Auth.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";  // 👈 Import CSS

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password },
          { withCredentials: true }
        );
        navigate("/dashboard");
      } else {
        await axios.post("http://localhost:5000/api/auth/register", {
          email,
          password,
        });
        alert("✅ Registered successfully! Please login now.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("⚠️ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p className="auth-toggle">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
