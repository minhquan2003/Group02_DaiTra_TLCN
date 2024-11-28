import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import {useProduct} from '../../hooks/Products'; // Nhập custom hook
import { addToCart } from '../../hooks/Carts';

const ProductDisplay = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id); // Sử dụng custom hook
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(product?.quantity || 0, e.target.value)); // Giới hạn số lượng
        setQuantity(value);
    };

    const totalPrice = product ? quantity * product.price : 0;

    const handleAddToCart = () => {
        const userInfoString = sessionStorage.getItem('userInfo');
        const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
        addToCart(
            {
                user_buyer: userInfo._id,
                user_seller: product.user_id,
                product_id: product._id,
                product_name: product.name,
                product_quantity: quantity,
                product_price: product.price,
                product_imageUrl: product.image_url,
            });
    }

    if (error) {
        return <div>{error}</div>; // Xử lý lỗi
    }

    if (loading) {
        return <p>Loading...</p>; // Hiển thị loading khi chưa có dữ liệu
    }

    return (
        <div className="flex max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {product && (
                <>
                    <img src={product.image_url} alt={product.name} className="w-1/2 object-cover rounded-lg" />
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
                        <div className="mt-4">
                            <label className="block mb-2">
                                <strong>Chọn số lượng:</strong>
                            </label>
                            <input 
                                type="number" 
                                min="1"
                                max={product.quantity}
                                value={quantity} 
                                onChange={handleQuantityChange} 
                                className="border rounded p-2 w-20"
                            />
                        </div>
                        <p className="mt-4 text-lg font-bold">
                            Tổng tiền: {totalPrice.toLocaleString()} VNĐ
                        </p>
                        <button 
                            onClick={handleAddToCart} 
                            className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300"
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button 
                            className="mt-4 ml-40 bg-blue-500 text-white rounded p-2 hover:bg-red-600 transition duration-300"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDisplay;