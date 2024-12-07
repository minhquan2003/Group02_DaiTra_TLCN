import Users from "../../../models/Users.js";
import Products from "../../../models/Products.js";

export const getStatisticsByTime = async (timeframe) => {
  try {
    let dateGroup;
    let format;

    // Phân loại theo thời gian
    if (timeframe === "week") {
      dateGroup = {
        $isoWeek: "$updatedAt", // Tuần trong năm
      };
      format = "Week";
    } else if (timeframe === "month") {
      dateGroup = {
        $month: "$updatedAt", // Tháng
      };
      format = "Month";
    } else if (timeframe === "year") {
      dateGroup = {
        $year: "$updatedAt", // Năm
      };
      format = "Year";
    } else {
      throw new Error("Invalid timeframe. Use 'week', 'month', or 'year'.");
    }

    // Thống kê người dùng
    const userStats = await Users.aggregate([
      {
        $group: {
          _id: dateGroup,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Thống kê sản phẩm
    const productStats = await Products.aggregate([
      {
        $group: {
          _id: dateGroup,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return {
      format,
      users: userStats,
      products: productStats,
    };
  } catch (error) {
    throw new Error("Failed to fetch statistics: " + error.message);
  }
};
