import React from "react";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Logout
        </button>
      </div>
      <div>Admin Dashboard (overview coming soon)</div>
    </div>
  );
};

export default AdminDashboard;
