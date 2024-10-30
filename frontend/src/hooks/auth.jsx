import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:5555/auth/login", { email, password });
      console.log("Login response:", response.data);
      // localStorage.setItem('token', response.data.token); 
      setIsAuthenticated(true);
      window.location.href = '/signup';
    } catch (err) {
      alert(err)
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post("/api/signup", userData);
      console.log("Signup response: ", response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Signup error: ", err);
      setError("Signup failed! Please try again.");
    }
  };

  return { isAuthenticated, login, signup, error };
};
