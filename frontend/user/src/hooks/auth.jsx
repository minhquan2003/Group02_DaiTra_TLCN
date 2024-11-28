import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5555";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:5555/auth/login", {
        email,
        password,
      });
      console.log("Login response:", response.data);
      // localStorage.setItem('token', response.data.token);
      const userResponse = await axios.post(
        "http://localhost:5555/users/email",
        { email }
      );
      setIsAuthenticated(true);
      sessionStorage.setItem("userInfo", JSON.stringify(userResponse.data));
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post("/auth/signup", userData);
      console.log("Signup response:", response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed! Please try again.");
    }
  };

  return { isAuthenticated, login, signup, error };
};
