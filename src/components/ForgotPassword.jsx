import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      setMsg(res.data.message);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email, cooldown: res.data.cooldown } });
      }, 0);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h3>Forgot Password</h3>
      <form onSubmit={submit}>
        <input
          className="form-control mb-3"
          type="email"
          value={email}
          placeholder="Enter registered Gmail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default ForgotPassword;