import React, { useState, useEffect } from "react";
import useRegulation from "../../hooks/useRegulation";

const RegulationList = ({ refreshRegulations }) => {
  const { regulations, loading, error, deleteRegulation, customRegulation } =
    useRegulation();
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (refreshRegulations) {
      refreshRegulations();
    }
  }, [regulations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = (id) => {
    deleteRegulation(id);
  };

  const handleCustom = (id, regulation) => {
    setFormData({
      title: regulation.title,
      description: regulation.description,
    });
    setSelectedRegulation(id);
    setShowModal(true);
  };

  const handleSubmit = () => {
    customRegulation(selectedRegulation, formData);
    setShowModal(false);
  };

  return (
    <div className="w-5/6 ml-[16.6666%] p-4 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Our Regulations
      </h2>
      <input
        type="text"
        placeholder="Search by title"
        className="mb-4 w-full p-2 border rounded"
      />
      {regulations.length === 0 ? (
        <div>No active regulations found.</div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {regulations.map((regulation) => (
              <tr key={regulation._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {regulation.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {regulation.description}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleCustom(regulation._id, regulation)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6h10M10 12h10M10 18h10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(regulation._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
