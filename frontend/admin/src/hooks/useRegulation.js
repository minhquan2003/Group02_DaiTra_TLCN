import { useState, useEffect } from "react";
import axios from "axios";

const useRegulation = () => {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Hàm xóa regulation
  const deleteRegulation = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/admin/regulation/${id}`);
      // Sau khi xóa, gọi lại fetchRegulations để cập nhật lại danh sách regulations
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
      // Sau khi tùy chỉnh, gọi lại fetchRegulations để cập nhật lại danh sách regulations
      await fetchRegulations();
    } catch (err) {
      setError("Error updating regulation");
    }
  };

  // Gọi fetchRegulations khi component được load lần đầu
  useEffect(() => {
    fetchRegulations();
  }, []);

  return { regulations, loading, error, deleteRegulation, customRegulation };
};

export default useRegulation;
