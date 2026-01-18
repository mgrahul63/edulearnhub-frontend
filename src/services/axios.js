import axios from "axios";

const customaxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Load token from localStorage (if exists)
const token = localStorage.getItem("token");
if (token) {
  customaxios.defaults.headers.common["token"] = token;
}

// Request Interceptor
customaxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor (optional)
customaxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default customaxios;
