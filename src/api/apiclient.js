import axios from "axios";

const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request and response interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token ? token : ""}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
