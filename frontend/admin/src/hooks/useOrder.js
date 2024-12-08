import { useState, useEffect } from "react";
import axios from "axios";

const useTopSellingProducts = (timeFrame) => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5555/admin/top-selling-products`,
          {
            params: { timeFrame },
          }
        );
        setTopProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (timeFrame) {
      fetchTopProducts();
    }
  }, [timeFrame]);

  return { topProducts, loading, error };
};

const usePurchaseOverview = () => {
  const [overviewData, setOverviewData] = useState({
    totalOrders: 0,
    totalAmount: "",
    totalCancelledOrders: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseOverview = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/order-stats"
        );
        setOverviewData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPurchaseOverview();
  }, []);

  return { overviewData, loading, error };
};

export { useTopSellingProducts, usePurchaseOverview };
