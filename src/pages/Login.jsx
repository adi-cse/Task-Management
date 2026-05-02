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
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --gradient-primary: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
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

  .login-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
    padding: 0;
  }

  .login-background {
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
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    top: -200px;
    right: -100px;
    animation: float 8s ease-in-out infinite;
  }

  .blob-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #10b981, #059669);
    bottom: -150px;
    left: -100px;
    animation: float 10s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, -30px); }
  }

  .login-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 380px;
  }

  .login-header {
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

  .login-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 10px;
    background: var(--gradient-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
    animation: bounce 3s ease-in-out infinite;
  }

  .login-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }

  .login-subtitle {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 400;
  }

  .login-card {
    background: white;
    border-radius: 16px;
    padding: 24px 22px;
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--border-color);
    animation: fadeInUp 0.8s ease-out 0.1s both;
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
    margin-bottom: 14px;
    animation: fadeIn 0.6s ease-out;
  }

  .form-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: "Poppins", sans-serif;
    color: var(--text-primary);
    transition: all 0.3s ease;
    background: white;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    background: rgba(37, 99, 235, 0.02);
  }

  .form-input::placeholder {
    color: var(--text-secondary);
  }

  .form-input:hover {
    border-color: var(--primary-color);
  }

  .login-button {
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
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    position: relative;
    overflow: hidden;
    margin-top: 8px;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 18px 0;
    color: var(--text-secondary);
  }

  .divider-text {
    padding: 0 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .signup-section {
    text-align: center;
    margin-top: 16px;
    animation: fadeInUp 0.8s ease-out 0.5s both;
  }

  .signup-text {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 10px;
  }

  .signup-button {
    width: 100%;
    padding: 12px;
    background: white;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-md);
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
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 600px) {
    .login-card {
      padding: 20px 18px;
    }

    .login-title {
      font-size: 1.5rem;
    }

    .form-input {
      padding: 11px 12px;
      font-size: 16px;
    }

    .blob {
      opacity: 0.08;
      filter: blur(100px);
    }
  }

  @media (max-width: 400px) {
    .login-container {
      padding: 0;
    }

    .login-card {
      padding: 18px 16px;
      border-radius: 14px;
    }

    .login-title {
      font-size: 1.4rem;
    }

    .login-subtitle {
      font-size: 0.75rem;
    }

    .form-input {
      padding: 10px 12px;
      font-size: 16px;
      border-radius: 6px;
    }

    .login-button,
    .signup-button {
      font-size: 0.85rem;
      padding: 11px;
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      login(res.data);

// 🔥 IMPORTANT
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Login successful! Redirecting...");

      // Small delay for UX
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        {/* Background blobs */}
        <div className="login-background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        {/* Login content */}
        <div className="login-content">
          {/* Header */}
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your Team Task Manager account</p>
          </div>

          {/* Login card */}
          <div className="login-card">
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

            {/* Login form */}
            <form onSubmit={handleLogin}>
              {/* Email input */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span className="divider-text">New to Team Task Manager?</span>
            </div>

            {/* Signup section */}
            <div className="signup-section">
              <p className="signup-text">
                Create an account to get started
              </p>
              <button
                className="signup-button"
                onClick={() => navigate("/register")}
                disabled={loading}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}