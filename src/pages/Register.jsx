import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");

  :root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --gradient-primary: linear-gradient(135deg, #10b981 0%, #059669 100%);
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: "Poppins", sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .register-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #f0fdf4 0%, #f1f5f9 50%, #ecfdf5 100%);
    padding: 0;
  }

  .register-background {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    opacity: 0.15;
    filter: blur(80px);
  }

  .blob-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #10b981, #059669);
    top: -200px;
    right: -100px;
    animation: float 8s ease-in-out infinite;
  }

  .blob-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #34d399, #10b981);
    bottom: -150px;
    left: -100px;
    animation: float 10s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, -30px); }
  }

  .register-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 380px;
  }

  .register-header {
    text-align: center;
    margin-bottom: 25px;
    animation: slideInDown 0.8s ease-out;
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .register-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 10px;
    background: var(--gradient-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
    animation: bounce 3s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .register-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }

  .register-subtitle {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 400;
  }

  .register-card {
    background: white;
    border-radius: 16px;
    padding: 24px 22px;
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--border-color);
    animation: fadeInUp 0.8s ease-out 0.1s both;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
  }

  .register-card::-webkit-scrollbar {
    width: 6px;
  }

  .register-card::-webkit-scrollbar-track {
    background: transparent;
  }

  .register-card::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
  }

  .register-card::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-group {
    margin-bottom: 13px;
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .form-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-input,
  .form-select {
    width: 100%;
    padding: 11px 13px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: "Poppins", sans-serif;
    color: var(--text-primary);
    transition: all 0.3s ease;
    background: white;
  }

  .form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 35px;
  }

  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: var(--success-color);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    background: rgba(16, 185, 129, 0.02);
  }

  .form-input::placeholder {
    color: var(--text-secondary);
  }

  .form-input:hover,
  .form-select:hover {
    border-color: var(--success-color);
  }

  .register-button {
    width: 100%;
    padding: 12px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }

  .register-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.5s ease;
  }

  .register-button:hover::before {
    left: 100%;
  }

  .register-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
  }

  .register-button:active {
    transform: translateY(-1px);
  }

  .register-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .password-strength {
    margin-top: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .strength-bar {
    flex: 1;
    height: 3px;
    background: var(--border-color);
    border-radius: 2px;
    overflow: hidden;
  }

  .strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .strength-weak {
    background: var(--danger-color);
    width: 33%;
  }

  .strength-medium {
    background: var(--warning-color);
    width: 66%;
  }

  .strength-strong {
    background: var(--success-color);
    width: 100%;
  }

  .strength-text {
    color: var(--text-secondary);
    font-size: 0.7rem;
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 16px 0;
    color: var(--text-secondary);
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border-color);
  }

  .divider-text {
    padding: 0 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .login-section {
    text-align: center;
    margin-top: 14px;
    animation: fadeInUp 0.8s ease-out 0.5s both;
  }

  .login-text {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 10px;
  }

  .login-link {
    color: var(--success-color);
    font-weight: 700;
  }

  .login-button {
    width: 100%;
    padding: 11px;
    background: white;
    color: var(--success-color);
    border: 2px solid var(--success-color);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-md);
  }

  .login-button:hover {
    background: var(--success-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(16, 185, 129, 0.2);
  }

  .login-button:active {
    transform: translateY(-1px);
  }

  .login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .error-message {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger-color);
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(239, 68, 68, 0.3);
    font-size: 0.8rem;
    margin-bottom: 14px;
    animation: shake 0.4s ease-in-out, fadeIn 0.3s ease-out;
    font-weight: 500;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }

  .success-message {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success-color);
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    font-size: 0.8rem;
    margin-bottom: 14px;
    animation: fadeIn 0.3s ease-out;
    font-weight: 500;
  }

  .loading-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 6px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 600px) {
    .register-card {
      padding: 20px 18px;
    }

    .register-title {
      font-size: 1.5rem;
    }

    .form-input,
    .form-select {
      padding: 10px 12px;
      font-size: 16px;
    }

    .blob {
      opacity: 0.08;
      filter: blur(100px);
    }
  }

  @media (max-width: 400px) {
    .register-container {
      padding: 0;
    }

    .register-card {
      padding: 18px 16px;
      border-radius: 14px;
    }

    .register-title {
      font-size: 1.4rem;
    }

    .register-subtitle {
      font-size: 0.75rem;
    }

    .form-input,
    .form-select {
      padding: 10px 12px;
      font-size: 16px;
      border-radius: 6px;
    }

    .register-button,
    .login-button {
      font-size: 0.85rem;
      padding: 10px;
    }
  }
`;

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name");
      return false;
    }

    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }

    if (!form.email.trim()) {
      setError("Please enter your email");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!form.password) {
      setError("Please enter a password");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return "medium";
    return "strong";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // 1. Register user
      await api.post("/auth/register", form);

      // 2. Auto login after register
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      // 3. Save token + user
      login(res.data);

      // 4. Save to localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Account created! Redirecting...");

      // Small delay for UX
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMsg);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <>
      <style>{styles}</style>
      <div className="register-container">
        {/* Background blobs */}
        <div className="register-background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        {/* Register content */}
        <div className="register-content">
          {/* Header */}
          <div className="register-header">
            <div className="register-icon">✨</div>
            <h1 className="register-title">Join Us</h1>
            <p className="register-subtitle">Create your Team Task Manager account</p>
          </div>

          {/* Register card */}
          <div className="register-card">
            {/* Error message */}
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="success-message">
                ✓ {success}
              </div>
            )}

            {/* Register form */}
            <form onSubmit={handleRegister}>
              {/* Name input */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                />
              </div>

              {/* Email input */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </div>

              {/* Password input */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  disabled={loading}
                />
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div className={`strength-fill strength-${passwordStrength}`}></div>
                    </div>
                    <span className="strength-text">{passwordStrength}</span>
                  </div>
                )}
              </div>

              {/* Role select */}
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  disabled={loading}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Register button */}
              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span className="divider-text">Already have an account?</span>
            </div>

            {/* Login section */}
            <div className="login-section">
              <p className="login-text">
                Sign in to your existing account
              </p>
              <button
                className="login-button"
                onClick={() => navigate("/login")}
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}