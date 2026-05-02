import { useNavigate } from "react-router-dom";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Poppins:wght@300;400;500;600;700;800&display=swap");

  :root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --gradient-primary: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    line-height: 1.6;
  }

  .home-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
  }

  .background-blob {
    position: absolute;
    border-radius: 50%;
    opacity: 0.3;
    filter: blur(60px);
  }

  .blob-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    top: -100px;
    right: -100px;
    animation: float1 8s ease-in-out infinite;
  }

  .blob-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #10b981, #059669);
    bottom: 100px;
    left: -50px;
    animation: float2 10s ease-in-out infinite;
  }

  .blob-3 {
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    top: 50%;
    right: 10%;
    animation: float3 12s ease-in-out infinite;
  }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(30px, -30px); }
  }

  @keyframes float2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-40px, 40px); }
  }

  @keyframes float3 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(25px, 25px); }
  }

  .grid-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(229, 231, 235, 0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(229, 231, 235, 0.5) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    opacity: 0.3;
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 700px;
    padding: 20px;
    animation: fadeInUp 1s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-section {
    margin-bottom: 50px;
  }

  .icon-badge {
    display: inline-flex;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin-bottom: 20px;
    animation: bounce 3s ease-in-out infinite;
    border: 2px solid rgba(37, 99, 235, 0.2);
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .main-heading {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 15px;
    letter-spacing: -0.02em;
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

  .accent-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.3rem;
    color: var(--text-secondary);
    margin: 20px 0;
    font-weight: 500;
    animation: fadeIn 1s ease-out 0.2s both;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .highlight {
    color: var(--primary-color);
    font-weight: 700;
  }

  .divider {
    width: 60px;
    height: 4px;
    background: var(--gradient-primary);
    margin: 25px auto;
    border-radius: 2px;
    animation: expandWidth 0.8s ease-out 0.3s both;
  }

  @keyframes expandWidth {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 60px;
      opacity: 1;
    }
  }

  .description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.8;
    font-weight: 400;
    animation: fadeIn 1s ease-out 0.4s both;
  }

  .cta-section {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px 0;
    animation: fadeIn 1s ease-out 0.5s both;
  }

  .btn {
    position: relative;
    padding: 16px 32px;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: "Poppins", sans-serif;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 160px;
    justify-content: center;
  }

  .btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    z-index: 1;
    transition: left 0.5s ease;
  }

  .btn:hover .btn-shine {
    left: 100%;
  }

  .btn-primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.4);
  }

  .btn-primary:active {
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: white;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.2);
  }

  .btn-secondary:active {
    transform: translateY(-1px);
  }

  .btn-icon {
    font-size: 1.2em;
  }

  .stats-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-top: 60px;
    animation: fadeIn 1s ease-out 0.6s both;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border-color);
  }

  .floating-card {
    position: absolute;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
    animation: float 4s ease-in-out infinite;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .card-1 {
    top: 80px;
    left: 40px;
    animation-delay: 0s;
  }

  .card-2 {
    top: 60%;
    right: 60px;
    animation-delay: 0.5s;
  }

  .card-3 {
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 1s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @media (max-width: 768px) {
    .home-container {
      height: auto;
      min-height: 100vh;
      padding: 40px 20px;
    }

    .content-wrapper {
      padding: 20px;
    }

    .main-heading {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .cta-section {
      flex-direction: column;
      gap: 12px;
    }

    .btn {
      width: 100%;
    }

    .stats-section {
      flex-direction: column;
      gap: 20px;
    }

    .stat-divider {
      width: 40px;
      height: 1px;
    }

    .floating-card {
      display: none;
    }

    .background-blob {
      opacity: 0.15;
    }
  }

  @media (max-width: 480px) {
    .main-heading {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .btn {
      padding: 14px 24px;
      font-size: 0.95rem;
      min-width: 140px;
    }

    .stats-section {
      gap: 15px;
    }

    .stat-number {
      font-size: 1.3rem;
    }

    .stat-label {
      font-size: 0.75rem;
    }
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="home-container">
        {/* Animated background elements */}
        <div className="background-blob blob-1"></div>
        <div className="background-blob blob-2"></div>
        <div className="background-blob blob-3"></div>

        {/* Grid pattern overlay */}
        <div className="grid-overlay"></div>

        {/* Main content */}
        <div className="content-wrapper">
          {/* Hero section */}
          <div className="hero-section">
            <div className="icon-badge">
              <span>✨</span>
            </div>

            <h1 className="main-heading">
              Team Task <span className="accent-text">Manager</span>
            </h1>

            <p className="subtitle">
              Collaborate seamlessly. Organize tasks. <span className="highlight">Ship faster.</span>
            </p>

            <div className="divider"></div>

            <p className="description">
              Streamline your workflow with intelligent task management.
              <br />
              Built for teams that want to move at light speed.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="cta-section">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              <span className="btn-content">
                <span className="btn-icon">→</span>
                <span className="btn-text">Login</span>
              </span>
              <span className="btn-shine"></span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/register")}
            >
              <span className="btn-content">
                <span className="btn-icon">+</span>
                <span className="btn-text">Create Account</span>
              </span>
              <span className="btn-shine"></span>
            </button>
          </div>

          {/* Social proof / Stats */}
          <div className="stats-section">
            <div className="stat">
              <span className="stat-number">2.5K+</span>
              <span className="stat-label">Teams</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">15M+</span>
              <span className="stat-label">Tasks</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>

        {/* Floating cards (visual enhancement) */}
        <div className="floating-card card-1">
          <div className="card-icon">📋</div>
          <div className="card-text">Organize</div>
        </div>
        <div className="floating-card card-2">
          <div className="card-icon">🤝</div>
          <div className="card-text">Collaborate</div>
        </div>
        <div className="floating-card card-3">
          <div className="card-icon">⚡</div>
          <div className="card-text">Execute</div>
        </div>
      </div>
    </>
  );
}