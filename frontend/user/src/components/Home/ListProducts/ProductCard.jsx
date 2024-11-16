import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, description, price, quantity, image_url }) => {
    return (
        <Link to={`/product/${id}`} className="flex mt-2 mb-2 justify-center items-center" style={{ width: '270px', height: '350px', textDecoration: 'none' }}>
            <div className="bg-white h-full border rounded-lg shadow-md p-2 m-2 hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-[60%] overflow-hidden rounded-t-lg">
                    <img 
                        src={image_url} 
                        alt={name} 
                        className="object-cover" 
                        style={{ width: '250px', height: '200px' }} // Thiết lập kích thước cố định cho ảnh
                    />
                </div>
                <div className="w-full h-[40%] p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                    {/* <p className="text-gray-600 mt-2">{description}</p> */}
                    <p className="text-lg font-bold text-gray-800 mt-2">{price.toLocaleString('vi-VN')} VNĐ</p>
                    <p className="text-gray-500">Số lượng: {quantity}</p>
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
};

export default ProductCard;