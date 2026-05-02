import axios from "axios";

const api = axios.create({
  baseURL: "https://full-stack-task-management-system-8ebt.onrender.com/api"
});

// 🔥 token auto attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;