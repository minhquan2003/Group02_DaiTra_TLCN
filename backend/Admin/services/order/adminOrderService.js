import OrderDetails from "../../../models/OrderDetails.js";
import Products from "../../../models/Products.js";
import Orders from "../../../models/Orders.js";

// Function to format the total amount in readable units (e.g., trillion, million, etc.)
const formatAmount = (amount) => {
  if (amount >= 1e12) return `${(amount / 1e12).toFixed(2)} Tỷ`;
  if (amount >= 1e9) return `${(amount / 1e9).toFixed(2)} Triệu`;
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(2)} Triệu`;
  return amount;
};

export const getOrderStats = async () => {
  try {
    // Aggregate orders to calculate totals
    const stats = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalMoney: { $sum: "$total_amount" },
          totalCancelled: {
            $sum: { $cond: [{ $eq: ["$status_order", "Cancelled"] }, 1, 0] },
          },
          totalSuccessful: {
            $sum: {
              $cond: [
                {
                  $in: ["$status_order", ["Confirmed", "Shipped", "Delivered"]],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    if (stats.length === 0) {
      return {
        totalOrders: 0,
        totalMoney: 0,
        totalCancelled: 0,
        totalSuccessful: 0,
      };
    }

    const { totalOrders, totalMoney, totalCancelled, totalSuccessful } =
      stats[0];

    return {
      totalOrders,
      totalMoney: formatAmount(totalMoney),
      totalCancelled,
      totalSuccessful,
    };
  } catch (error) {
    throw new Error(`Error fetching order statistics: ${error.message}`);
  }
};

export const getTopSellingProducts = async (timeFrame) => {
  try {
    // Xác định khoảng thời gian lọc
    let startDate;
    const currentDate = new Date();

    if (timeFrame === "day") {
      startDate = new Date(currentDate.setHours(0, 0, 0, 0)); // Đầu ngày
    } else if (timeFrame === "week") {
      const startOfWeek = currentDate.getDate() - currentDate.getDay();
      startDate = new Date(currentDate.setDate(startOfWeek));
      startDate.setHours(0, 0, 0, 0);
    } else if (timeFrame === "month") {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ); // Đầu tháng
    } else if (timeFrame === "year") {
      startDate = new Date(currentDate.getFullYear(), 0, 1); // Đầu năm
    } else {
      throw new Error("Invalid time frame provided");
    }

    // Lọc đơn hàng theo thời gian
    const topProducts = await OrderDetails.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: "$product_id",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]);

    // Lấy thông tin chi tiết sản phẩm (tên và ảnh)
    const productIds = topProducts.map((item) => item._id);
    const productDetails = await Products.find({
      _id: { $in: productIds },
    }).select("name image_url");

    // Kết hợp dữ liệu
    const result = topProducts.map((item) => {
      const product = productDetails.find(
        (p) => p._id.toString() === item._id.toString()
      );
      return {
        productId: item._id,
        name: product?.name || "Unknown",
        image_url: product?.image_url || "",
        totalQuantity: item.totalQuantity,
      };
    });

    return result;
  } catch (error) {
    throw new Error(`Error fetching top selling products: ${error.message}`);
  }
};
