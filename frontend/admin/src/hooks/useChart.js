import { useState, useEffect } from "react";
import axios from "axios";

const useChart = (timeframe) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5555/admin/statistics-by-time?timeframe=${timeframe}`
        );
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (timeframe) {
      fetchData();
    }
  }, [timeframe]);

  return { data, loading, error };
};

export default useChart;
