import { updateProductStatus } from "../../services/product/adminProductService.js";

// Chấp nhận cho hiện bài viết sản phẩm
const approveProduct = async (req, res) => {
  const { productId } = req.params; // Get product ID from route parameters

  try {
    const updatedProduct = await updateProductStatus(productId);
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

export { approveProduct };
