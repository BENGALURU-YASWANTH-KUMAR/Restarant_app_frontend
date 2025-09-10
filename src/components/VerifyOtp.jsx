import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const { state } = useLocation();
  const email = state?.email || "";
  const initialCooldown = state?.cooldown || 0;
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(initialCooldown);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });
      setMsg(res.data.message);
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setMsg("");
    setResendLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/resend-otp`, { email });
      setMsg(res.data.message);
      setCooldown(res.data.cooldown);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error resending OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h3>Verify OTP</h3>
      <p>Enter the 6-digit OTP sent to <b>{email}</b></p>
      <form onSubmit={submit}>
        <input
          className="form-control mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter OTP"
          maxLength={6}
        />
        <button 
          className="btn btn-success w-100 mb-3"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={resendOtp}
          disabled={cooldown > 0 || resendLoading}
        >
          {resendLoading ? "Sending..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
        </button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default VerifyOtp;