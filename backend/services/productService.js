import Products from "../models/Products.js";

const createProduct = async (productData) => {
    const product = new Products(productData);
    return await product.save();
  };
  
const getProducts = async () => {
    return await Products.find({});
  };
  
const getOneProductById = async (idProduct) => {
    return await Products.findById(idProduct);
  };
  
const updateOneProduct = async (id, updateData) => {
    return await Products.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
  };
  
const deleteOneProduct = async (id) => {
    return await Products.findByIdAndDelete(id);
  };

export {createProduct, getProducts, getOneProductById, updateOneProduct, deleteOneProduct}