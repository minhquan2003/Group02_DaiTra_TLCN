import {
  updateProductStatusToTrue,
  getProducts,
  updateProductStatusToFalse,
  deleteProduct,
  getRequestProducts,
} from "../../services/product/adminProductService.js";

// Chấp nhận cho hiện bài viết sản phẩm
const approveProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await updateProductStatusToTrue(productId);

    res.status(200).json({
      message: "Product status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product status",
      error: error.message,
    });
  }
};

// Ẩn sản phẩm (status thành false)
const hideProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProduct = await updateProductStatusToFalse(productId);
    res.status(200).json({
      message: "Product hidden successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to hide product",
      error: error.message,
    });
  }
};

// Xóa sản phẩm theo ID
const removeProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await deleteProduct(productId);
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await getProducts(parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      total: result.total,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      data: result.products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPendingProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await getRequestProducts(parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      total: result.total,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      data: result.products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  approveProduct,
  getAllProducts,
  hideProduct,
  removeProduct,
  getPendingProducts,
};
