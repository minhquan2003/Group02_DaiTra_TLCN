import React from "react";
import CategoryItem from "./Category";
import { getCategories } from '../../../hooks/Categories';

const ListCategories = () => {
  const { categories } = getCategories();

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md m-4">
    {/* Tiêu đề danh mục */}
    <h2 className="text-2xl font-bold mb-4">Danh mục sản phẩm</h2>
    
    <div className="flex flex-wrap justify-center -mx-2">
        {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
        ))}
    </div>
</div>
  );
};

export default ListCategories;