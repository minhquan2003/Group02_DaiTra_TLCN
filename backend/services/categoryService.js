import Categories from '../models/Categories.js';

const createCategory = async (CategoryData) => {
    const Category = new Categories(CategoryData);
    return await Category.save();
  };
  
const getCategory = async () => {
  return await Categories.find({ status: true });
};
  
const getOneCategoryById = async (idCategory) => {
    return await Categories.findById(idCategory);
  };
  
const updateOneCategory = async (id, updateData) => {
    return await Categories.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
  };
  
const deleteOneCategory = async (id) => {
    return await Categories.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
};

export {createCategory, getCategory, getOneCategoryById, updateOneCategory, deleteOneCategory}