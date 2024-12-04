import Products from "../../../models/Products.js";
import Categories from "../../../models/Categories.js";
import Users from "../../../models/Users.js";

// Chuyển trạng thái status thành true
const updateProductStatusToTrue = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      productId,
      { status: true },
      { new: true }
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    throw new Error("Error updating product status: " + error.message);
  }
};

// Chuyển trạng thái status thành false
const updateProductStatusToFalse = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      productId,
      { status: false },
      { new: true }
    );

    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error updating product status to false: " + error.message);
  }
};

// Xóa sản phẩm theo ID
const deleteProduct = async (productId) => {
  try {
    const product = await Products.findByIdAndDelete(productId);
    if (!product) {
      throw new Error("Product not found or already deleted");
    }
    return product;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

// Lấy tất cả sản phẩm với phân trang
const getProducts = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const products = await Products.find({ status: true })
      .skip(skip)
      .limit(limit)
      .lean();

    // Fetch Category and User names
    for (const product of products) {
      const category = await Categories.findById(product.category_id);
      const user = await Users.findById(product.user_id);
      product.category_name = category?.name || "Unknown";
      product.username = user?.username || "Unknown User";
    }

    const totalProducts = await Products.countDocuments({ status: true });

    return {
      products,
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

// Lấy tất cả sản phẩm với status = false (đang chờ duyệt)
const getRequestProducts = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    // Lấy sản phẩm có status là false (đang chờ duyệt)
    const products = await Products.find({ status: false })
      .skip(skip)
      .limit(limit)
      .lean(); // Chuyển kết quả thành plain JS object

    // Fetch thêm Category và User theo cách thủ công để tương đồng với getProducts
    for (const product of products) {
      const category = await Categories.findById(product.category_id);
      const user = await Users.findById(product.user_id);

      // Thêm category_name và username vào product
      product.category_name = category?.category_name || "Unknown"; // Lưu ý sử dụng category_name
      product.username = user?.username || "Unknown User";
    }

    const totalProducts = await Products.countDocuments({ status: false });

    return {
      products,
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error("Error fetching pending products: " + error.message);
  }
};

export {
  updateProductStatusToTrue,
  getProducts,
  updateProductStatusToFalse,
  deleteProduct,
  getRequestProducts,
};
