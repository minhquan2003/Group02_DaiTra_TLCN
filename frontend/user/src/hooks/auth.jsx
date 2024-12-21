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
            const userResponse = await axios.post("/users/email", { email });
            setIsAuthenticated(true);
            sessionStorage.setItem("userInfo", JSON.stringify(userResponse.data));
            window.location.href = "/";
        } catch (err) {
            console.error("Login error:", err);
            alert("Invalid credentials. Please try again.");
            setError("Invalid credentials. Please try again.");
        }
    };

    const sendOtp = async (email) => {
        try {
          // alert(email)
            const response = await axios.post("/mail/send-otp", { email });
            console.log("OTP sent:", response.data.message);
            return true;
        } catch (err) {
           alert("Error sending OTP:", err);
            setError("Failed to send OTP. Please try again.");
            return false;
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
          
            const response = await axios.post("/mail/verify-otp", { email, otp });
            return response.data.valid;
        } catch (err) {
            console.error("OTP verification error:", err);
            setError("Invalid OTP. Please try again.");
            return false;
        }
    };

    const signup = async (userData) => {
        try {
            const mail = { email: userData.email };
            const userResponse = await axios.post("/users/email",  mail );
            if (userResponse.data) {
                alert("Người dùng đã tồn tại!");
                window.location.href = "/login";
                return;
            }

            const response = await axios.post("/users", userData);
            console.log("Signup response:", response.data);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Signup error:", err);
            alert("Signup error: " + (err.response?.data?.message || err.message));
            setError(err.response?.data?.message || "An error occurred during signup.");
        }
    };

    return { isAuthenticated, login, signup, sendOtp, verifyOtp, error };
};