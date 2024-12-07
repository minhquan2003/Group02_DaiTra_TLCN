import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../hooks/Products'; // Nhập custom hook
import { addToCart } from '../../hooks/Carts';
import BackButton from '../../commons/BackButton';
import {useReviews} from '../../hooks/Review'; // Import custom hook cho reviews

const ProductDisplay = () => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const { id } = useParams();
    const user_buyer_id = userInfo ? userInfo._id : '';
    const { product, loading, error } = useProduct(id); // Sử dụng custom hook
    const { reviews, loadingReviews, errorReviews } = useReviews(id); // Sử dụng hook cho reviews
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(product?.quantity || 0, e.target.value)); // Giới hạn số lượng
        setQuantity(value);
    };

    const totalPrice = product ? quantity * product.price : 0;
    
    const handleAddToCart = () => {
        {userInfo ? addToCart({
            user_buyer: userInfo._id,
            user_seller: product.user_id,
            product_id: product._id,
            product_name: product.name,
            product_quantity: quantity,
            product_price: product.price,
            product_imageUrl: product.image_url,
        }) : 
        alert("Bạn chưa đăng nhập!")}
        
    }

    if (error) {
        return <div>{error}</div>; // Xử lý lỗi
    }

    if (loading) {
        return <p>Loading...</p>; // Hiển thị loading khi chưa có dữ liệu
    }

    return (
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
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
                            {/* Hiển thị thêm thông tin brand, condition, origin */}
                            {product.brand && (
                                <p className="mt-2">
                                    <strong>Hãng:</strong> {product.brand}
                                </p>
                            )}
                            {product.condition && (
                                <p className="mt-2">
                                    <strong>Tình trạng:</strong> {product.condition}
                                </p>
                            )}
                            {product.origin && (
                                <p className="mt-2">
                                    <strong>Xuất xứ:</strong> {product.origin}
                                </p>
                            )}
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
                                onClick={() => navigate('/checkout', { state: { 
                                    product: {
                                        user_buyer: user_buyer_id,
                                        user_seller: product.user_id,
                                        product_id: product._id,
                                        product_name: product.name,
                                        product_quantity: quantity,
                                        product_price: product.price,
                                        product_imageUrl: product.image_url
                                    } 
                                } })} 
                                className="mt-4 ml-40 bg-blue-500 text-white rounded p-2 hover:bg-red-600 transition duration-300"
                            >
                                Đặt hàng
                            </button>
                            <button className="bg-blue-500 mt-4 w-full text-white rounded p-2 hover:bg-blue-600 transition duration-300" onClick={() => navigate(`/seller/${product.user_id}`)}>
                                Xem trang người bán
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Hiển thị các review */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">Đánh giá</h2>
                {loadingReviews ? (
                    <p>Loading reviews...</p>
                ) : errorReviews ? (
                    <p className="text-red-500">{errorReviews}</p>
                ) : (
                    reviews.length > 0 ? (
                        <ul className="mt-4">
                            {reviews.map(review => (
                                <li key={review._id} className="border-b py-2">
                                    <div>
                                        <strong>User ID: {review.user_id}</strong>
                                    </div>
                                    <div>
                                        <strong>Rating: {review.rating}/5</strong>
                                    </div>
                                    <div>
                                        <p>{review.comment}</p>
                                    </div>
                                    <div className="text-gray-500 text-sm">Ngày
                                    {" " + new Date(review.createdAt).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chưa có đánh giá nào.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;