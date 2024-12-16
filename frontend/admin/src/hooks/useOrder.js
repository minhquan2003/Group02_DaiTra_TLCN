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

const useOrders = (page, limit) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/admin/orders", {
          params: { page, limit },
        });
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, limit]);

  return { orders, loading, error };
};

const useSearchOrder = (page, limit, searchQuery) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!searchQuery) return; // Nếu không có từ khóa tìm kiếm, không gọi API
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/search-orders",
          {
            params: { page, limit, search: searchQuery },
          }
        );
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, limit, searchQuery]);

  return { orders, loading, error };
};

export {
  useTopSellingProducts,
  usePurchaseOverview,
  useOrders,
  useSearchOrder,
};
