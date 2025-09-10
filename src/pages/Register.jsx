import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const phoneRegex = /^[0-9]{10}$/;

// Moved PasswordHints outside to prevent re-renders
const PasswordHints = ({ password }) => {
  const p = password;
  const checks = [
    { ok: p.length >= 8, label: "At least 8 characters" },
    { ok: /[A-Z]/.test(p), label: "One uppercase letter" },
    { ok: /[a-z]/.test(p), label: "One lowercase letter" },
    { ok: /\d/.test(p), label: "One number" },
    { ok: /[\W_]/.test(p), label: "One special character" },
  ];

  return (
    <ul style={{ fontSize: 13, marginTop: 8 }}>
      {checks.map((c) => (
        <li key={c.label} style={{ color: c.ok ? "green" : "crimson" }}>
          {c.ok ? "✔" : "✖"} {c.label}
        </li>
      ))}
    </ul>
  );
};

// Moved Field component outside to prevent re-creating on every render
const Field = ({
  id,
  label,
  type = "text",
  value,
  error,
  onChange,
  showEmailHint = false,
  showPasswordHints = false,
  passwordValue = "",
  showPassword = false,
  onTogglePassword = null
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label" style={{ color: "#6a11cb" }}>
      {label}
    </label>
    <div className="position-relative">
      <input
        type={type === "password" && showPassword ? "text" : type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        style={{ borderRadius: "10px", paddingRight: type === "password" ? "45px" : "12px" }}
      />
      {type === "password" && (
        <button
          type="button"
          className="btn btn-sm position-absolute"
          style={{ right: "10px", top: "32px", backgroundColor: "transparent", border: "none" }}
          onClick={onTogglePassword}
        >
          {showPassword ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </button>
      )}
    </div>
    {showEmailHint && (
      <div style={{ fontSize: 12, marginTop: 6, color: "#555" }}>
        Use an @gmail.com email address (example: user@gmail.com)
      </div>
    )}
    {showPasswordHints && <PasswordHints password={passwordValue} />}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Use useCallback for onChange to prevent re-creating function
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const validations = useMemo(() => {
    const errs = {};
    if (!form.fullName || form.fullName.trim().length < 2)
      errs.fullName = "Full name must be at least 2 characters";
    if (!form.username || form.username.trim().length < 3)
      errs.username = "Username must be at least 3 characters";
    if (!form.email || !emailRegex.test(form.email))
      errs.email = "Use a valid @gmail.com address";
    if (!form.phone || !phoneRegex.test(form.phone))
      errs.phone = "Phone must be 10 digits";
    if (!form.address || form.address.trim().length < 5)
      errs.address = "Address must be at least 5 characters";
    if (!form.password || !passwordRegex.test(form.password))
      errs.password =
        "Min 8 chars with uppercase, lowercase, number, and special character";
    if (form.confirmPassword !== form.password)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  }, [form]);

  const isValid = useMemo(
    () => Object.keys(validations).length === 0,
    [validations]
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors(validations);
    if (!isValid) return;

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/register`, {
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        password: form.password,
      });
      alert(response.data.message || "Registered successfully");
      navigate("/login");
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) setErrors(data.errors);
      alert(data?.message || data?.code || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container my-5">
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="card shadow p-5"
            style={{
              maxWidth: "500px",
              width: "100%",
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              border: "none",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              className="text-center mb-4"
              style={{ color: "#6a11cb", fontWeight: "600" }}
            >
              Register
            </h3>
            <form onSubmit={handleRegister} noValidate>
              <Field
                id="fullName"
                label="Full Name"
                value={form.fullName}
                error={errors.fullName}
                onChange={onChange}
              />
              <Field
                id="username"
                label="Username"
                value={form.username}
                error={errors.username}
                onChange={onChange}
              />
              <Field
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={onChange}
                showEmailHint={true}
              />
              <Field
                id="phone"
                label="Phone Number"
                type="tel"
                value={form.phone}
                error={errors.phone}
                onChange={onChange}
              />
              <Field
                id="address"
                label="Address"
                value={form.address}
                error={errors.address}
                onChange={onChange}
              />
              <Field
                id="password"
                label="Password"
                type="password"
                value={form.password}
                error={errors.password}
                onChange={onChange}
                showPasswordHints={true}
                passwordValue={form.password}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
              <Field
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChange={onChange}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <button
                type="submit"
                className="btn w-100"
                style={{
                  borderRadius: "10px",
                  backgroundColor: isValid ? "#6a11cb" : "#999",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: isValid ? "pointer" : "not-allowed",
                }}
                disabled={!isValid}
              >
                Register
              </button>
            </form>
            <div style={{ fontSize: 12, color: "#666", marginTop: 10 }}>
              Password policy enforced client and server for safety.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;