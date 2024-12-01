import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5555";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log("Login response:", response.data);

      // Uncomment this line if you want to store token in sessionStorage
      // localStorage.setItem('token', response.data.token);

      const userResponse = await axios.post("/users/email", { email });
      setIsAuthenticated(true);
      sessionStorage.setItem("userInfo", JSON.stringify(userResponse.data));
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err); // In ra lỗi chi tiết
      alert("Invalid credentials. Please try again.");
      setError("Invalid credentials. Please try again.");
    }
  };

  const signup = async (userData) => {
    try {
      const mail = { email: userData.email };
      const userResponse = await axios.post("/users/email", mail);

      // Kiểm tra xem người dùng đã tồn tại hay chưa
      if (userResponse.status === 200) {
        alert("Người dùng đã tồn tại!");
        window.location.href = "/login";
        return;
      }

      const response = await axios.post("/users", userData);
      console.log("Signup response:", response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Signup error:", err); // In ra lỗi chi tiết
      alert("Signup error: " + (err.response?.data?.message || err.message));
      setError(err.response?.data?.message || "An error occurred during signup.");
    }
  };

  return { isAuthenticated, login, signup, error };
};