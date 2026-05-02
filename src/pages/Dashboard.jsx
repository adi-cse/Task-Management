import { useEffect, useState } from "react";
import api from "../api/axios";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");

  :root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
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
    font-family: "Poppins", sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .dashboard-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 24px;
  }

  /* ERROR MESSAGE */
  .error-banner {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: var(--danger-color);
    padding: 14px 16px;
    margin-bottom: 20px;
    border-radius: 12px;
    font-weight: 500;
    animation: slideDown 0.3s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* HEADER */
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    animation: slideInDown 0.6s ease-out;
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header-content h2 {
    font-size: 1.1rem;
    color: var(--text-secondary);
    font-weight: 500;
    margin-bottom: 4px;
  }

  .header-content h3 {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .logout-btn {
    padding: 12px 28px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);
  }

  .logout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(239, 68, 68, 0.3);
  }

  .logout-btn:active {
    transform: translateY(0);
  }

  /* ADMIN PANEL */
  .admin-panel {
    background: white;
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    animation: fadeInUp 0.6s ease-out 0.1s both;
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

  .admin-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .admin-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-input,
  .form-select {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    font-size: 0.95rem;
    font-family: "Poppins", sans-serif;
    color: var(--text-primary);
    transition: all 0.3s ease;
    background: white;
    display: block;
  }

  .form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 40px;
  }

  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    background: rgba(37, 99, 235, 0.02);
  }

  .form-input:hover,
  .form-select:hover {
    border-color: var(--primary-color);
  }

  .create-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    margin-top: 8px;
  }

  .create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(37, 99, 235, 0.4);
  }

  .create-btn:active {
    transform: translateY(0);
  }

  .create-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* STATS */
  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: white;
    border-radius: 14px;
    padding: 20px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
  }

  .stat-card:nth-child(2)::before {
    background: linear-gradient(90deg, var(--success-color), #059669);
  }

  .stat-card:nth-child(3)::before {
    background: linear-gradient(90deg, var(--warning-color), #d97706);
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .stat-number {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--text-primary);
  }

  /* TASKS SECTION */
  .tasks-section {
    animation: fadeInUp 0.6s ease-out 0.2s both;
  }

  .section-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 16px;
    border: 2px dashed var(--border-color);
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  .empty-text {
    font-size: 1.1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .loading-text {
    text-align: center;
    padding: 40px 20px;
    font-size: 1.1rem;
    color: var(--text-secondary);
  }

  .tasks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .task-card {
    background: white;
    border-radius: 14px;
    padding: 20px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .task-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.4;
  }

  .task-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .task-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-label {
    font-weight: 600;
    color: var(--text-primary);
  }

  .task-value {
    color: var(--text-secondary);
  }

  .assigned-to {
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(37, 99, 235, 0.02));
    padding: 10px 12px;
    border-radius: 8px;
    border-left: 3px solid var(--primary-color);
    font-size: 0.85rem;
  }

  .assigned-label {
    font-weight: 600;
    color: var(--text-primary);
  }

  .assigned-name {
    color: var(--primary-color);
    font-weight: 700;
  }

  .status-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning-color);
  }

  .status-in-progress {
    background: rgba(37, 99, 235, 0.1);
    color: var(--primary-color);
  }

  .status-completed {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success-color);
  }

  .task-select {
    padding: 10px 12px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: "Poppins", sans-serif;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 32px;
  }

  .task-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .task-select:hover {
    border-color: var(--primary-color);
  }

  @media (max-width: 768px) {
    .dashboard-container {
      padding: 16px;
    }

    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .header-content h3 {
      font-size: 1.6rem;
    }

    .admin-panel {
      padding: 20px;
    }

    .stats-container {
      grid-template-columns: 1fr;
    }

    .tasks-grid {
      grid-template-columns: 1fr;
    }

    .logout-btn {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .dashboard-container {
      padding: 12px;
    }

    .header-content h3 {
      font-size: 1.4rem;
    }

    .header-content h2 {
      font-size: 0.95rem;
    }

    .admin-title {
      font-size: 1.1rem;
    }

    .section-title {
      font-size: 1.2rem;
    }

    .task-card {
      padding: 16px;
    }

    .task-title {
      font-size: 1rem;
    }

    .stat-number {
      font-size: 1.8rem;
    }
  }
`;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  // 🔐 Protected Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // 👤 Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 📦 Load data
  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchUsers();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let res;

      if (user?.role === "admin") {
        res = await api.get("/tasks");
      } else {
        res = await api.get("/tasks/my");
      }

      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Error fetching tasks ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {}
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    } catch {
      setError("Error updating task ❌");
    }
  };

  const createTask = async () => {
    if (!title || !assignedTo) {
      setError("Fill all fields");
      return;
    }

    try {
      await api.post("/tasks", { title, assignedTo });
      setTitle("");
      setAssignedTo("");
      setError("");
      fetchTasks();
    } catch {
      setError("Only admin allowed ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "In Progress":
        return "status-in-progress";
      case "Pending":
      default:
        return "status-pending";
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-container">
        {/* 🔴 ERROR */}
        {error && <div className="error-banner">⚠️ {error}</div>}

        {/* 🔝 HEADER */}
        <div className="dashboard-header">
          <div className="header-content">
            <h2>Welcome back 👋</h2>
            <h3>{user?.name}</h3>
          </div>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* 🧑‍💼 ADMIN PANEL */}
        {user?.role === "admin" && (
          <div className="admin-panel">
            <div className="admin-title">
              <div className="admin-icon">⚙️</div>
              Create Task
            </div>

            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="form-select"
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>

            <button onClick={createTask} className="create-btn">
              Create Task
            </button>
          </div>
        )}

        {/* 📊 STATS */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-label">📊 Total Tasks</div>
            <div className="stat-number">{total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">✅ Completed</div>
            <div className="stat-number">{completed}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">⏳ Pending</div>
            <div className="stat-number">{pending}</div>
          </div>
        </div>

        {/* 📋 TASKS */}
        <div className="tasks-section">
          <div className="section-title">
            <div className="section-icon">📋</div>
            Tasks
          </div>

          {loading ? (
            <div className="loading-text">Loading... ⏳</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <div className="empty-text">No tasks found</div>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map((t) => (
                <div key={t._id} className="task-card">
                  <div className="task-title">{t.title}</div>

                  <div className="task-info">
                    {user?.role === "admin" && (
                      <div className="assigned-to">
                        <div className="assigned-label">Assigned to:</div>
                        <div className="assigned-name">
                          {t.assignedTo?.name}
                        </div>
                      </div>
                    )}

                    <div className="task-info-row">
                      <span className="task-label">Status:</span>
                      <span
                        className={`status-badge ${getStatusBadgeClass(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>

                  {user?.role !== "admin" && (
                    <select
                      value={t.status}
                      onChange={(e) => updateStatus(t._id, e.target.value)}
                      className="task-select"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
