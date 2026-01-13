import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage: React.FC = () => {
  const { login, error, loading, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }
    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: 32,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Graduation Requirement Checker Login</h2>
      <p style={{ marginBottom: 20, fontSize: "0.9em", color: "#666" }}>
        <strong>Unified Login Portal</strong>
        <br />
        Admins: Use an email containing "admin" (e.g., admin@test.com)
        <br />
        Students: Use any other email (e.g., student@test.com)
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        {(formError || error) && (
          <div style={{ color: "red", marginBottom: 8 }}>
            {formError || error}
          </div>
        )}
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
