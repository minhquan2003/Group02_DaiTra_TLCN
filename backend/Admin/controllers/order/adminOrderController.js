import {
  getTopSellingProducts,
  getOrderStats,
} from "../../services/order/adminOrderService.js";

export const fetchTopSellingProducts = async (req, res) => {
  try {
    const { timeFrame } = req.query; // Lấy timeFrame từ query string
    if (!["day", "week", "month", "year"].includes(timeFrame)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time frame. Allowed values: day, week, month, year.",
      });
    }

    const topProducts = await getTopSellingProducts(timeFrame);
    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchOrderStats = async (req, res) => {
  try {
    const stats = await getOrderStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
