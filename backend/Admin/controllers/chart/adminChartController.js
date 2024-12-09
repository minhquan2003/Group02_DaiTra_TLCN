import { getStatisticsByTime } from "../../services/chart/adminChartService.js";

export const getStatisticsByTimeController = async (req, res) => {
  const { timeframe } = req.query; // Lấy tham số 'timeframe' từ URL
  try {
    const stats = await getStatisticsByTime(timeframe);
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
