import React, { useState, useEffect } from "react";
import useNotification from "../../hooks/useNotification";

const NotificationList = () => {
  const {
    notifications,
    loading,
    error,
    removeNotification,
    editNotification,
  } = useNotification();

  const [menuVisible, setMenuVisible] = useState(null); // ID của thông báo đang mở menu
  const [editMode, setEditMode] = useState(null); // ID của thông báo đang chỉnh sửa
  const [editTitle, setEditTitle] = useState(""); // Nội dung chỉnh sửa

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleEdit = (id) => {
    editNotification(id, { title: editTitle });
    setEditMode(null);
    setMenuVisible(null);
  };

  const handleDelete = (id) => {
    removeNotification(id);
    setMenuVisible(null);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading notifications...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Notification List</h2>
      <ul className="space-y-4">
        {/* Sử dụng notifications.data để lấy mảng thông báo */}
        {notifications?.data?.map((notification) => (
          <li
            key={notification._id}
            className="relative p-4 border rounded-md shadow-sm flex justify-between items-center"
          >
            {editMode === notification._id ? (
              <div className="flex gap-2 items-center w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit notification"
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <button
                  onClick={() => handleEdit(notification._id)}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{notification.message}</span>
                <button
                  onClick={() => toggleMenu(notification._id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  ⋮
                </button>
                {menuVisible === notification._id && (
                  <div className="absolute top-full right-0 mt-2 bg-white border rounded-md shadow-lg w-32 z-10">
                    <button
                      onClick={() => {
                        setEditMode(notification._id);
                        setEditTitle(notification.message);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
