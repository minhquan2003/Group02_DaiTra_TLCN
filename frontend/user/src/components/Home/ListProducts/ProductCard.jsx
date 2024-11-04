import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const ProductCard = ({ name, description, price, quantity, image_url }) => {
    return ( // link /product/${productId}
        <Link to={`#`} className="bg-white border rounded-lg shadow-md p-2 m-2 max-w-sm hover:shadow-lg transition-shadow duration-300 h-90 mt-2 mb-4">
            <div className="w-full h-[60%] overflow-hidden rounded-t-lg">
                <img src={image_url} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[40%] p-4">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">{price.toFixed(3)} VNĐ</p>
                <p className="text-gray-500">Số lượng: {quantity}</p>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
};

export default ProductCard;     