import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser"; // Assuming this provides necessary API functions

const UserList = () => {
  const { accounts, bans, users, loading, toggleBan, deleteAccount } =
    useUser();
  const [activeUserId, setActiveUserId] = useState(null);
  const [message, setMessage] = useState(null);
  const [userList, setUserList] = useState(users || []); // Local copy of users

  // Ensure user list syncs with the provided users prop
  useEffect(() => {
    setUserList(users);
  }, [users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleMenuToggle = (userId) => {
    setActiveUserId((prev) => (prev === userId ? null : userId));
  };

  const handleAction = async (action, userId) => {
    try {
      let response;
      if (action === "toggleBan") {
        // Toggle the ban status using the hook
        await toggleBan(userId, userList.find((u) => u._id === userId).banned); // Directly toggles the ban status
        // After toggling, update the userList to reflect the new banned status
        setUserList((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, banned: !user.banned } : user
          )
        );
        setMessage(
          `Successfully ${
            userList.find((u) => u._id === userId).banned
              ? "unbanned"
              : "banned"
          } the account.`
        );
      } else if (action === "deleteAccount") {
        // Call the deleteAccount function from the hook
        await deleteAccount(userId); // Directly deletes the user from the hook's state
        setMessage("Successfully deleted the account.");
      }
    } catch (error) {
      console.error("Error during action:", error);
      setMessage(
        `Failed to ${
          action === "toggleBan" ? "toggle ban" : "delete"
        } the account.`
      );
    }
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-md mt-4">
      <h1 className="text-lg font-bold">Total Accounts: {accounts}</h1>
      <h2 className="text-lg font-bold">Banned Accounts: {bans}</h2>
      <input
        type="text"
        placeholder="Account Name, Email or Phone"
        className="mb-4 w-full p-2 border rounded"
      />

      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <div>
        {userList.map((user) => (
          <div
            key={user._id}
            className={`flex items-center justify-between p-4 border-b hover:bg-gray-100 ${
              user.banned ? "opacity-50" : "" // Apply fade effect for banned users
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-black rounded-full"></div>
              <div className="ml-4">
                <div className="font-medium">
                  {user._id} - {user.name}
                </div>
                <div className="text-gray-500 text-sm">{user.email}</div>
              </div>
            </div>
            <div className="relative">
              <button
                className="text-blue-500"
                onClick={() => handleMenuToggle(user._id)}
              >
                ⋮
              </button>
              {activeUserId === user._id && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                  <button
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                    onClick={() => handleAction("toggleBan", user._id)}
                  >
                    {user.banned ? "Unban Account" : "Ban Account"}
                  </button>
                  <button
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                    onClick={() => handleAction("deleteAccount", user._id)}
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
