import { getUserStatisticsByYear } from "../../services/chart/adminChartService.js";

export const getUserStatistics = async (req, res) => {
  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ message: "Year is required" });
  }

  try {
    const statistics = await getUserStatisticsByYear(Number(year));
    return res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch user statistics" });
  }
};
