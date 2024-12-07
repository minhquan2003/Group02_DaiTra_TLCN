import Products from "../models/Products.js";

const createProduct = async (productData) => {
    const product = new Products(productData);
    return await product.save();
  };
  
const getProducts = async () => {
    return await Products.find({ status: true });
  };
  
const getOneProductById = async (idProduct) => {
  return await Products.findOne({ _id: idProduct, status: true });
  };

const getProductsByCategory = async (categoryId) => {
  try {
    const products = await Products.find({ category_id: categoryId, status: true });
    return products;
  } catch (error) {
    throw new Error(`Unable to fetch products: ${error.message}`);
  }
};

const getProductsByUserId = async (userId) => {
  try {
      const products = await Products.find({ user_id: userId, status: true });
      return products;
  } catch (error) {
      throw new Error(`Unable to fetch products: ${error.message}`);
  }
};

// Tìm kiếm sản phẩm theo tên
const searchProductsByName = async (productName) => {
  try {
      // Tìm kiếm sản phẩm với tên không phân biệt chữ hoa chữ thường
      return await Products.find({
          name: { $regex: productName, $options: 'i' }, // 'i' để không phân biệt chữ hoa chữ thường
          status: true // Chỉ tìm kiếm sản phẩm còn hoạt động
      });
  } catch (error) {
      throw new Error(`Unable to search products: ${error.message}`);
  }
};
  
const updateOneProduct = async (id, updateData) => {
    return await Products.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
  };

const updateQuanlityProduct = async (id, quanlity) => {
  return await Products.findByIdAndUpdate(
    id,
    { $inc: { quantity: quanlity } },
    { new: true }
  );
};
  
const deleteOneProduct = async (id) => {
  return await Products.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
};

export {createProduct, 
  getProducts, 
  getOneProductById, 
  getProductsByCategory,
  getProductsByUserId,
  searchProductsByName, 
  updateOneProduct, 
  updateQuanlityProduct,
  deleteOneProduct}