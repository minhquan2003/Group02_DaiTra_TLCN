import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md"; // Icon ba chấm dọc
import useRegulation from "../../hooks/useRegulation";

const RegulationList = () => {
  const { regulations, loading, error, deleteRegulation, customRegulation } =
    useRegulation();
  const [selectedRegulation, setSelectedRegulation] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = (id) => {
    deleteRegulation(id);
  };

  const handleCustom = (id) => {
    // Logic cho việc tùy chỉnh regulation (ví dụ: mở modal chỉnh sửa)
    const updatedData = {
      title: "New Title", // Cập nhật tiêu đề
      description: "Updated description", // Cập nhật mô tả
    };
    customRegulation(id, updatedData);
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

              {/* Icon ba chấm và tùy chọn */}
              <div className="relative">
                <button
                  onClick={() => setSelectedRegulation(regulation._id)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <MdMoreVert size={20} />
                </button>
                {selectedRegulation === regulation._id && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40">
                    <button
                      onClick={() => handleCustom(regulation._id)}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      Customize
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
    </div>
  );
};

export default RegulationList;
