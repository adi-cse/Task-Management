import { useEffect, useState } from "react";
import api from "../api/axios";

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
      window.location.href = "/login";
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
        prev.map((t) =>
          t._id === id ? { ...t, status } : t
        )
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
      fetchTasks();
    } catch {
      setError("Only admin allowed ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  return (
    <div style={styles.container}>

      {/* 🔴 ERROR */}
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {/* 🔝 HEADER */}
      <div style={styles.header}>
        <div>
          <h2>Welcome back 👋</h2>
          <h3>{user?.name}</h3>
        </div>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* 🧑‍💼 ADMIN PANEL */}
      {user?.role === "admin" && (
        <div style={styles.admin}>
          <h3>Create Task</h3>

          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            style={styles.input}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>

          <button onClick={createTask} style={styles.create}>
            Create Task
          </button>
        </div>
      )}

      {/* 📊 STATS */}
      <div style={styles.stats}>
        <div>Total: {total}</div>
        <div>Completed: {completed}</div>
        <div>Pending: {pending}</div>
      </div>

      {/* 📋 TASKS */}
      <h3>Tasks</h3>

      {loading ? (
        <p>Loading... ⏳</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found 🎉</p>
      ) : (
        tasks.map((t) => (
          <div key={t._id} style={styles.task}>
            <h4>{t.title}</h4>

            {user?.role === "admin" && (
              <p>Assigned to: {t.assignedTo?.name}</p>
            )}

            <p>Status: {t.status}</p>

            {user?.role !== "admin" && (
              <select
                value={t.status}
                onChange={(e) =>
                  updateStatus(t._id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// 🎨 Simple CSS
const styles = {
  container: {
    padding: "20px",
    background: "#f4f4f4",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  logout: {
    background: "red",
    color: "white",
    padding: "8px",
    border: "none",
  },
  admin: {
    background: "white",
    padding: "10px",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "8px",
    width: "100%",
  },
  create: {
    background: "green",
    color: "white",
    padding: "8px",
  },
  stats: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  task: {
    background: "white",
    padding: "10px",
    marginBottom: "10px",
  },
  error: {
    background: "#ffdddd",
    padding: "10px",
    marginBottom: "10px",
    color: "red",
  },
};