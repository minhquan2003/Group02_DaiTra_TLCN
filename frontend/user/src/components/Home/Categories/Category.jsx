import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const CategoryItem = ({ category }) => {
  return (
    <Link 
      to={`/category/${category._id}`} // Thay đổi đường dẫn theo tham số category.id
      className="category-item m-2 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 inline-flex flex-col items-center p-2"
      style={{ width: '100px', height: '100px' }}
    >
      <div className="category-image overflow-hidden">
        <img 
          src={category.image_url} 
          alt={category.category_name} 
          className="object-cover" 
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      <div className="category-info mt-1 text-center">
        <h3 className="text-xs font-semibold text-gray-800">{category.category_name}</h3>
      </div>
    </Link>
  );
};

// Định nghĩa prop types
CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired, // Đảm bảo category có id
    image_url: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
  }).isRequired
};

export default CategoryItem;