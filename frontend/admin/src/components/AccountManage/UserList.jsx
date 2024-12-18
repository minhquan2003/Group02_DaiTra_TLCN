import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { BiSolidUserDetail } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiLock, BiLockOpen } from "react-icons/bi"; // Import lock icons

const UserList = () => {
  const { accounts, bans, users, loading, toggleBan, deleteAccount } =
    useUser();
  const [userList, setUserList] = useState(users || []);
  const [bannedUsers, setBannedUsers] = useState(
    users.filter((user) => user.banned)
  ); // Track banned users
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setUserList(users);
    setBannedUsers(users.filter((user) => user.banned)); // Update banned users on users change
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUserList(filteredUsers);
  };

  const handleAction = async (action, user) => {
    try {
      if (action === "toggleBan") {
        await toggleBan(user._id, user.banned);
        // Update banned users list
        if (user.banned) {
          setBannedUsers((prevBannedUsers) =>
            prevBannedUsers.filter((u) => u._id !== user._id)
          );
        } else {
          setBannedUsers((prevBannedUsers) => [...prevBannedUsers, user]);
        }
        setUserList((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, banned: !user.banned } : u
          )
        );
        setMessage(`User ${user.banned ? "unbanned" : "banned"} successfully.`);
      } else if (action === "deleteAccount") {
        await deleteAccount(user._id);
        setUserList((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
        setBannedUsers((prevBannedUsers) =>
          prevBannedUsers.filter((u) => u._id !== user._id)
        );
        setMessage("User deleted successfully.");
      }
    } catch (error) {
      console.error("Action failed:", error);
      setMessage("Failed to perform action.");
    }
    setConfirmationAction(null);
    setSelectedUser(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const confirmAction = (action, user) => {
    setConfirmationAction(action);
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md mt-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        User Manage
      </h2>

      {/* Success/Failure Message */}
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          className="border px-4 py-2 rounded w-full"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* User Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Detail</th>
            <th className="border px-4 py-2">Delete</th>
            <th className="border px-4 py-2">Lock</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr
              key={user._id}
              className={`hover:bg-gray-50 ${user.banned ? "opacity-50" : ""}`}
            >
              <td className="text-sm border px-4 py-2">{user.name}</td>
              <td className="text-sm border px-4 py-2">{user.email}</td>
              <td className="text-sm border px-4 py-2">{user.phone}</td>
              <td className="text-sm border px-4 py-2 text-center">
                <button
                  className="text-blue-500 mx-2"
                  title="View Details"
                  onClick={() => setViewingUser(user)}
                >
                  <BiSolidUserDetail />
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="text-red-500 mx-2"
                  title="Delete Account"
                  onClick={() => confirmAction("deleteAccount", user)}
                >
                  <RiDeleteBin2Line />
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="text-yellow-500 mx-2"
                  title={user.banned ? "Unban Account" : "Ban Account"}
                  onClick={() => confirmAction("toggleBan", user)}
                >
                  {user.banner ? (
                    <BiLockOpen /> // Show unlock icon if banner is true
                  ) : user.banned ? (
                    <BiLock /> // Show lock icon if banned
                  ) : (
                    <BiLock /> // Show lock icon if not banned and no banner
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {confirmationAction && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
            <p>
              Are you sure you want to{" "}
              {confirmationAction === "deleteAccount"
                ? "delete"
                : selectedUser.banned
                ? "unban"
                : "ban"}{" "}
              the user <strong>{selectedUser.name}</strong>?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-200 px-4 py-2 rounded mr-2"
                onClick={() => setConfirmationAction(null)}
              >
                Cancel
              </button>
              <button
                className={`${
                  confirmationAction === "deleteAccount"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                } text-white px-4 py-2 rounded`}
                onClick={() => handleAction(confirmationAction, selectedUser)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Viewing User Modal */}
      {viewingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">User Details</h2>
            <div className="flex justify-center mb-4">
              <img
                src={viewingUser.avatar_url}
                alt="Avatar"
                className="rounded-full h-24 w-24"
              />
            </div>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Name</td>
                  <td className="border px-4 py-2">{viewingUser.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Email</td>
                  <td className="border px-4 py-2">{viewingUser.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Phone</td>
                  <td className="border px-4 py-2">{viewingUser.phone}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Address</td>
                  <td className="border px-4 py-2">{viewingUser.address}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Created At</td>
                  <td className="border px-4 py-2">
                    {new Date(viewingUser.createdAt).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setViewingUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
