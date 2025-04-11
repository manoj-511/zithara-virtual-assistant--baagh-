import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // Make sure the path is correct

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const goToBaagh = () => {
    navigate("/chatbot");
  };

  return (
    <div className="dashboard-container">
      <div className="logout-button-container">
        <button className="dashboard-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="dashboard-title">Welcome to Your Assistant</h1>

      <div className="dashboard-card">
        <button className="dashboard-button" onClick={goToBaagh}>
          Go to Baagh 🐯
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
