import Users from "../../../models/Users.js";
import Products from "../../../models/Products.js";

export const getStatisticsByTime = async (timeframe) => {
  try {
    let dateGroup;
    let format;

    // Set grouping logic based on timeframe
    if (timeframe === "week") {
      dateGroup = {
        $isoWeek: "$updatedAt", // Group by ISO week
      };
      format = "Week";
    } else if (timeframe === "month") {
      dateGroup = {
        $month: "$updatedAt", // Group by month
      };
      format = "Month";
    } else if (timeframe === "year") {
      dateGroup = {
        $year: "$updatedAt", // Group by year
      };
      format = "Year";
    } else {
      throw new Error("Invalid timeframe. Use 'week', 'month', or 'year'.");
    }

    // Statistics for users
    const userStats = await Users.aggregate([
      {
        $group: {
          _id: dateGroup,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by the grouped value (week, month, or year)
      },
    ]);

    // Statistics for products
    const productStats = await Products.aggregate([
      {
        $group: {
          _id: dateGroup,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by the grouped value (week, month, or year)
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
