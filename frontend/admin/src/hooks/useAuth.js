import { useState } from "react";

export const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:5555/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/"; // Redirect to dashboard
    } catch (err) {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    }
  };

  return { login, error };
};
