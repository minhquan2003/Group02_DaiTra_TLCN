import Products from "../../../models/Products.js";

//Chuyển trạng thái status thành true
const updateProductStatus = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      productId,
      { status: true }, // Set status to true
      { new: true } // Return the updated product
    );
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error updating product status: " + error.message);
  }
};

export { updateProductStatus };
