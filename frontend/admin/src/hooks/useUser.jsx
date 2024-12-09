import { useEffect, useState } from "react";
import axios from "axios";

const useUser = () => {
  const [accounts, setAccounts] = useState(0);
  const [bans, setBans] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/all-users"
        );
        console.log("Fetched totalUsers:", response.data.totalUsers); // Debug output
        if (response.data.totalUsers !== undefined) {
          setAccounts(response.data.totalUsers || 0);
          setUsers(response.data.users || []); // Cập nhật danh sách người dùng
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/all-banner"
        );
        console.log("Banned users:", response.data); // Debug output
        if (response.data && response.data.totalBannedUsers !== undefined) {
          setBans(response.data.totalBannedUsers || 0);
        }
      } catch (error) {
        console.error("Error fetching banned users:", error);
      }
    };

    fetchUsers();
    fetchBans();
  }, []);

  // Toggle ban/unban account
  const toggleBan = async (id, currentLockedStatus) => {
    try {
      const endpoint = currentLockedStatus
        ? `http://localhost:5555/admin/unban-user/${id}`
        : `http://localhost:5555/admin/ban-user/${id}`;

      await axios.put(endpoint);

      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, banned: !user.banned } : user
        )
      );

      setBans(currentLockedStatus ? (prev) => prev - 1 : (prev) => prev + 1);
    } catch (error) {
      console.error("Error toggling ban status:", error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/admin/delete-account/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      setAccounts((prev) => prev - 1); // Giảm tổng số tài khoản
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const searchUsers = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:5555/admin/search`, {
        params: { keyword },
      });
      return response.data.users || [];
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  return {
    accounts,
    bans,
    users,
    loading,
    toggleBan,
    deleteAccount,
    searchUsers,
  };
};

export default useUser;
