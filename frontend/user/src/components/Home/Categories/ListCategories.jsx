import React from "react";
import CategoryItem from "./Category";
import {getCategories} from '../../../hooks/Categories'

const ListCategories = () => {
  const { categories } = getCategories();
  return (
    <div className="flex flex-wrap ml-8 -mx-2">
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
};

export default ListCategories;