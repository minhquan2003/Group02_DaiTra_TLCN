import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../commons/BackButton';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Lấy danh sách sản phẩm từ cart
    const cartItems = location.state?.cartItems || [];

    // Tính tổng tiền
    const totalAmount = cartItems.reduce((acc, item) => 
        acc + item.product_quantity * item.product_price, 0
    );

    // State để lưu thông tin người dùng
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash'); // Mặc định là trả tiền khi nhận hàng

    const handleCheckout = () => {
        alert(`Thanh toán thành công! \nThông tin: \nHọ tên: ${fullName} \nSố điện thoại: ${phoneNumber} \nĐịa chỉ: ${address} \nEmail: ${email} \nPhương thức thanh toán: ${paymentMethod}`);
        navigate('/'); // Chuyển hướng về trang chính
    };

    return (
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
                <h1 className="text-2xl font-bold ml-4">Thanh Toán</h1>
            </div>
            <div className="flex space-x-10">
                {/* Phần thông tin người nhận */}
                <div className="flex-1 border rounded shadow-md p-5">
                    <h2 className="text-xl font-bold mb-4">Thông Tin Người Nhận</h2>
                    <input 
                        type="text" 
                        placeholder="Họ và Tên (bắt buộc)" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        className="border rounded p-2 w-full mb-2"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Số Điện Thoại (bắt buộc)" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="border rounded p-2 w-full mb-2"
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Địa Chỉ (bắt buộc)" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        className="border rounded p-2 w-full mb-2"
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email (nếu có)" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border rounded p-2 w-full mb-2"
                    />

                    <h3 className="text-lg font-semibold mt-4">Phương Thức Thanh Toán</h3>
                    <div className="mt-2">
                        <label>
                            <input 
                                type="radio" 
                                value="qr" 
                                checked={paymentMethod === 'qr'} 
                                onChange={() => setPaymentMethod('qr')} 
                            />
                            Quét Mã QR
                        </label>
                        <label className="ml-4">
                            <input 
                                type="radio" 
                                value="transfer" 
                                checked={paymentMethod === 'transfer'} 
                                onChange={() => setPaymentMethod('transfer')} 
                            />
                            Chuyển Khoản
                        </label>
                        <label className="ml-4">
                            <input 
                                type="radio" 
                                value="cash" 
                                checked={paymentMethod === 'cash'} 
                                onChange={() => setPaymentMethod('cash')} 
                            />
                            Trả Tiền Khi Nhận Hàng
                        </label>
                    </div>
                </div>

                {/* Phần hiển thị danh sách sản phẩm và tổng tiền */}
                <div className="flex-1 border rounded shadow-md p-5">
                    <h2 className="text-xl font-bold mb-4">Chi Tiết Đơn Hàng</h2>
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
                        className="mt-5 bg-blue-500 text-white rounded p-2 hover:bg-orange-600"
                    >
                        Thanh Toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;