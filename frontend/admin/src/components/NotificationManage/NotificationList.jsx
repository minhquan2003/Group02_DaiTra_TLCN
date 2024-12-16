import React, { useState, useEffect } from "react";
import useNotification from "../../hooks/useNotification";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons for edit and delete

const NotificationList = () => {
  const {
    notifications,
    loading,
    error,
    removeNotification,
    editNotification,
  } = useNotification();

  const [editMode, setEditMode] = useState(null); // ID of the notification being edited
  const [editTitle, setEditTitle] = useState(""); // Content for editing

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  // Calculate the index of the first and last notification to display
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications?.data?.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Handle edit and delete actions
  const handleEdit = (id) => {
    editNotification(id, { title: editTitle });
    setEditMode(null);
  };

  const handleDelete = (id) => {
    removeNotification(id);
  };

  // Pagination control functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading notifications...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Total number of pages
  const totalPages = Math.ceil(
    notifications?.data?.length / notificationsPerPage
  );

  return (
    <div className="w-5/6 ml-[16.6666%] p-4 bg-gray-100 rounded-md">
      <table className="w-full table-auto border-collapse border border-gray-300 bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Stt</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Notification
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentNotifications?.map((notification, index) => (
            <tr key={notification._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editMode === notification._id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit notification"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                  />
                ) : (
                  notification.message
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editMode === notification._id ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(notification._id)}
                      className="px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="px-2 py-1 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    {/* <button
                      onClick={() => {
                        setEditMode(notification._id);
                        setEditTitle(notification.message);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </button> */}
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="flex items-center justify-center px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
