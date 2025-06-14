import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000", // Replace with your backend URL
    withCredentials: true, // Enable cookies if needed
    headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor (add token if exists)
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor (handle errors globally)
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect if unauthorized
        }
        return Promise.reject(error);
    }
);

export default axiosClient;