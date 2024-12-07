import { useState, useEffect } from "react";
import axios from "axios";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5555/admin/notifications/"
      );
      setNotifications(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new notification
  const addNotification = async (notification) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/admin/notification/",
        notification
      );
      setNotifications((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit an existing notification
  const editNotification = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/admin/notification/${id}`,
        updatedData
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? response.data : notification
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Remove a notification
  const removeNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/admin/notification/${id}`);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    addNotification,
    editNotification,
    removeNotification,
    fetchNotifications,
  };
};

export default useNotification;
