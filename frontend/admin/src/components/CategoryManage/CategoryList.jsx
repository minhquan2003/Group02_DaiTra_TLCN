import React, { useState } from "react";
import useCategory from "../../hooks/useCategory";
import CategoryCustom from "./CategoryCustom";

function CategoryList() {
  const { categories, loading, deleteCategory } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex items-center border p-4 rounded-md bg-white"
          >
            <img
              src={category.image_url}
              alt={category.category_name}
              className="w-16 h-16 rounded mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {category.category_name}
              </h3>
            </div>
            <div>
              <button
                onClick={() => setSelectedCategory(category)}
                className="text-blue-500 hover:underline mr-2"
              >
                Custom
              </button>
              <button
                onClick={() => deleteCategory(category._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory !== null && (
        <CategoryCustom
          selectedCategory={selectedCategory}
          closeForm={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}

export default CategoryList;
