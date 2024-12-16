import Users from "../../../models/Users.js";

export const getUserStatisticsByYear = async (year) => {
  try {
    const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59Z`);
    const startOfPreviousYear = new Date(`${year - 1}-01-01T00:00:00Z`);
    const endOfPreviousYear = new Date(`${year - 1}-12-31T23:59:59Z`);

    // Lấy tổng số người dùng tích lũy đến cuối năm trước
    const previousYearTotal = await Users.countDocuments({
      createdAt: { $lte: endOfPreviousYear },
    });

    // Lấy số lượng người dùng mới tạo trong từng tháng của năm hiện tại
    const statistics = await Users.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalUsers: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          totalUsers: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    // Đảm bảo tất cả các tháng (1-12) đều có dữ liệu
    const fullStatistics = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalUsers: 0,
    }));

    statistics.forEach((stat) => {
      fullStatistics[stat.month - 1].totalUsers = stat.totalUsers;
    });

    // Tính tổng tích lũy, với tháng 1 bắt đầu từ tổng của năm trước
    let cumulativeTotal = previousYearTotal;
    const cumulativeStatistics = fullStatistics.map((stat) => {
      cumulativeTotal += stat.totalUsers;
      return { month: stat.month, totalUsers: cumulativeTotal };
    });

    return cumulativeStatistics;
  } catch (error) {
    throw new Error("Error calculating user statistics");
  }
};
