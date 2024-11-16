// src/ProductDisplay.js
import React from 'react';
import { useParams } from 'react-router-dom';
import {getProductById} from '../../hooks/Products'

const ProductDisplay = () => {
    const { id } = useParams();
    const {product}  = getProductById(id);

    return (
        <div className="flex max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {product && (
                <>
                    <img src={product.image_url} alt={product.name} className="w-1/2 h-auto rounded-lg" />
                    <div className="ml-6 w-1/2">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                        <p className="mt-4 text-lg font-bold">
                            Giá: {product.price.toLocaleString()} VNĐ
                        </p>
                        <p className="mt-2">
                            <strong>Số lượng còn lại:</strong> {product.quantity}
                        </p>
                        <p className="mt-2">
                            <strong>Trạng thái:</strong> {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </p>
                        <p className="mt-2">
                            <strong>Ngày tạo:</strong> {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-2">
                            <strong>Ngày cập nhật:</strong> {new Date(product.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDisplay;