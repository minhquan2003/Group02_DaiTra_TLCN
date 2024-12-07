import React, { useState } from "react";
import useRegulation from "../../hooks/useRegulation";

const RegulationList = () => {
  const { regulations, loading, error, deleteRegulation, customRegulation } =
    useRegulation();
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [showModal, setShowModal] = useState(false); // State để điều khiển việc hiển thị modal
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [showMenu, setShowMenu] = useState(null); // State để điều khiển menu

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = (id) => {
    deleteRegulation(id);
    setShowMenu(null); // Close the menu after deletion
  };

  const handleCustom = (id, regulation) => {
    // Cập nhật formData với dữ liệu của regulation đang chỉnh sửa
    setFormData({
      title: regulation.title,
      description: regulation.description,
    });
    setSelectedRegulation(id); // Cập nhật regulation đang được chỉnh sửa
    setShowModal(true); // Mở modal
    setShowMenu(null); // Close the menu when editing
  };

  const handleSubmit = () => {
    // Logic để submit form chỉnh sửa
    customRegulation(selectedRegulation, formData);
    setShowModal(false); // Đóng modal sau khi gửi form
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-md mt-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Our Regulations
      </h2>
      <input
        type="text"
        placeholder="Search by title"
        className="mb-4 w-full p-2 border rounded"
      />
      <ul>
        {regulations.length === 0 ? (
          <li>No active regulations found.</li>
        ) : (
          regulations.map((regulation) => (
            <li
              key={regulation._id}
              className="items-center border-b border-gray-300 p-4 mb-4 flex justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {regulation.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {regulation.description}
                </p>
              </div>

              {/* Icon ba chấm dọc và tùy chọn */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowMenu(
                      showMenu === regulation._id ? null : regulation._id
                    )
                  }
                  className="text-gray-600 hover:text-gray-900"
                >
                  <span style={{ fontSize: "20px" }}>&#x22EE;</span>{" "}
                  {/* Ba chấm dọc */}
                </button>
                {showMenu === regulation._id && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40">
                    <button
                      onClick={() => handleCustom(regulation._id, regulation)}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(regulation._id)}
                      className="w-full text-left p-2 hover:bg-gray-100 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Popup form chỉnh sửa */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-bold mb-4">Edit Regulation</h3>
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegulationList;
