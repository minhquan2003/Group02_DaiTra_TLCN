import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Lấy danh sách sản phẩm từ cart
    const cartItems = location.state?.cartItems || [];

    // Tính tổng tiền
    const totalAmount = cartItems.reduce((acc, item) => 
        acc + item.product_quantity * item.product_price, 0
    );

    const handleCheckout = () => {
        // Xử lý thanh toán ở đây
        alert('Thanh toán thành công!');
        navigate('/'); // Chuyển hướng về trang chính
    };

    return (
        <div className="p-5 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Thanh Toán</h2>
            {cartItems.length > 0 ? (
                <ul className="divide-y divide-gray-300">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                                <img 
                                    src={item.product_imageUrl} 
                                    alt={item.product_name} 
                                    className="w-16 h-16 object-cover rounded mr-4" 
                                />
                                <div>
                                    <h3 className="font-semibold">{item.product_name}</h3>
                                    <p className="text-gray-500">Đơn giá: {item.product_price.toLocaleString()} VNĐ</p>
                                    <p className="text-gray-500">Số lượng: {item.product_quantity}</p>
                                </div>
                            </div>
                            <span className="font-bold">{(item.product_price * item.product_quantity).toLocaleString() + ' VNĐ'}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Giỏ hàng trống.</p>
            )}
            <hr className="my-4" />
            <div className="flex justify-between font-bold">
                <span>Tổng Giá:</span>
                <span>{totalAmount.toLocaleString()} VNĐ</span>
            </div>
            <button 
                onClick={handleCheckout} 
                className="mt-5 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            >
                Thanh Toán
            </button>
        </div>
    );
};

export default Checkout;