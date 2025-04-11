import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css"; // 🔥 Make sure this path is correct

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setMessage("✅ Registered successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/"); // redirect to login
        }, 1500);
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Register Page</h2>

        {message && (
          <p style={{ color: "#00ffcc", marginBottom: "1rem" }}>{message}</p>
        )}

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <div className="auth-back" onClick={() => navigate("/")}>
          ← Back to Login
        </div>
      </div>
    </div>
  );
};

export default Register;
