import Categories from "../../../models/Categories.js";

// Lấy tất cả categories có phân trang và tổng số
export const getAllCategories = async (page, limit) => {
  try {
    const categories = await Categories.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCategories = await Categories.countDocuments();
    return {
      categories,
      totalCategories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

// Thêm mới category
export const addCategory = async (data) => {
  try {
    const category = new Categories(data);
    return await category.save();
  } catch (error) {
    throw new Error("Error adding category: " + error.message);
  }
};

// Sửa category theo ID
export const updateCategory = async (id, data) => {
  try {
    return await Categories.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

// Xóa category theo ID
export const deleteCategory = async (id) => {
  try {
    return await Categories.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting category: " + error.message);
  }
};

export const fetchCategoryById = async (categoryId) => {
  try {
    const category = await Categories.findById(categoryId).select("name");
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Error fetching category: " + error.message);
  }
};
