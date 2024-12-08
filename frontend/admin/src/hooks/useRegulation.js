import { useState, useEffect } from "react";
import axios from "axios";

const useRegulation = () => {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Hàm fetch regulations
  const fetchRegulations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5555/admin/regulations/"
      );
      const activeRegulations = response.data.data.filter(
        (regulation) => regulation.status === true
      );
      setRegulations(activeRegulations);
    } catch (err) {
      setError("Error fetching regulations");
    } finally {
      setLoading(false);
    }
  };

  // Hàm post regulation
  const postRegulation = async (newRegulation) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5555/admin/regulation/",
        newRegulation
      );
      const addedRegulation = response.data.data;
      setSuccess(true);
      // Add the new regulation to the list without refetching
      setRegulations((prevRegulations) => [
        ...prevRegulations,
        addedRegulation,
      ]);
    } catch (err) {
      setError("Error posting regulation");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa regulation
  const deleteRegulation = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/admin/regulation/${id}`);
      // After deleting, fetch regulations again to refresh the list
      await fetchRegulations();
    } catch (err) {
      setError("Error deleting regulation");
    }
  };

  // Hàm tùy chỉnh regulation (cập nhật regulation)
  const customRegulation = async (id, updatedData) => {
    try {
      await axios.put(
        `http://localhost:5555/admin/regulation/${id}`,
        updatedData
      );
      // After updating, fetch regulations again to refresh the list
      await fetchRegulations();
    } catch (err) {
      setError("Error updating regulation");
    }
  };

  // Fetch regulations when the component is loaded
  useEffect(() => {
    fetchRegulations();
  }, []);

  return {
    regulations,
    loading,
    error,
    deleteRegulation,
    customRegulation,
    postRegulation,
    success,
  };
};

export default useRegulation;
