// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email || "";
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/reset-password`, {
        email,
        password,
      });
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h3>Reset Password</h3>
      <form onSubmit={submit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Update Password</button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default ResetPassword;
