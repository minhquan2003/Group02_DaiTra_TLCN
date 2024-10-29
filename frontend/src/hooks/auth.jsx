import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/login", credentials); // Adjust the endpoint as necessary
      console.log("Login response:", response.data);
      setIsAuthenticated(true);
      // Optionally, handle tokens or user data returned from the server
    } catch (err) {
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
