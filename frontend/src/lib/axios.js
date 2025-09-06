import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://task-backend-y77t.onrender.com/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
    console.log("Unauthorized, redirecting to login...");
    }
    return Promise.reject(err);
  }
);

export default api;
