import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../commons/BackButton';
import {createOrder} from '../../hooks/Orders'
import { createOrderDetail } from '../../hooks/Orderdetails';
import { updateProduct } from '../../hooks/Products';
import {removeFromCart} from '../../hooks/Carts';
import { createNotification } from '../../hooks/Notifications';

const Checkout = () => {
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    const location = useLocation();
    const navigate = useNavigate();

    let cartItems = [];

    if (location.state?.product) {
        cartItems = [location.state.product];
    } else {
        cartItems = location.state?.cartItems || [];
    }
    

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
    const [note, setNote] = useState(''); // State cho ghi chú

    useEffect(() => {
        if(userInfo){
            setFullName(userInfo.name)
            setPhoneNumber(userInfo.phone)
            setAddress(userInfo.address)
            setEmail(userInfo.email)
        }
        
    }, [userInfo]);

    const handleCheckout = async () => {
        const userInfoString = sessionStorage.getItem('userInfo');
        const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
        // Kiểm tra các trường dữ liệu

        let finalPaymentInfo = [];

        if (!fullName || !phoneNumber || !address) {
            alert("Vui lòng nhập đầy đủ thông tin: Họ tên, Số điện thoại và Địa chỉ.");
            return; // Dừng thực hiện nếu có trường không hợp lệ
        }
    
        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
            return; // Dừng thực hiện nếu giỏ hàng trống
        }      

        let order;
        let orderIds = [];

        for (const item of cartItems) {
            // Kiểm tra thông tin sản phẩm
            if (!item.user_seller || !item.product_price || !item.product_quantity) {
                alert("Thông tin sản phẩm không hợp lệ. Vui lòng kiểm tra lại.");
                return; // Dừng thực hiện nếu thông tin sản phẩm không hợp lệ
            }

            const quanlity = -item.product_quantity;
            const id = item.product_id;
            const quanli = await updateProduct({ id, quanlity });

            if(quanli.quantity < 0){
                alert("Sản phẩm của bạn đã không còn hàng. Vui lòng tìm sản phẩm khác.")
                const quanlity = item.product_quantity;
                const quanli = await updateProduct({ id, quanlity });
                navigate('/')
                return
            }
            
            // Tạo đơn hàng
            order = await createOrder({
                user_id_buyer: cartItems[0].user_buyer,
                user_id_seller: cartItems[0].user_seller,
                name: fullName,
                phone: phoneNumber,
                address: address,
                total_amount: item.product_price * item.product_quantity, // Tổng tiền
                note: note,
            });

            orderIds.push(order.data._id);

            await createOrderDetail({
                order_id: order.data._id,
                product_id: item.product_id,
                quantity: item.product_quantity,
                price: item.product_price,
            });

            if(userInfo){
                const aa = await createNotification({
                    user_id_created: userInfo._id,
                    user_id_receive: userInfo._id,
                    message: `Bạn đã đặt thành công đơn hàng ${order.data.total_amount} VNĐ.`
                })
            }


            const idCart = item._id;
            if (!location.state?.product) {
                await removeFromCart(idCart);
            }

            const newPaymentInfo = {
                user_id_seller: cartItems[0].user_seller,
                order_id: order.data._id,
                product_id: item.product_id,
                quantity: item.product_quantity,
                price: item.product_price,
            };

        }

        sessionStorage.setItem("orderIds", JSON.stringify(orderIds));
        
        if (paymentMethod === 'onlinepay') {
            try {
                navigate(`/payment/${order.data._id}`, { state: { cartItems } }); // Đặt cartItems vào một đối tượng
            } catch (error) {
                console.error('Error creating payment:', error);
                alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.' + error);
            }
        }else{
            navigate('/')
        }
        alert(`Đơn hàng đã được tạo thành công! \nThông tin: \nHọ tên: ${fullName} \nSố điện thoại: ${phoneNumber} \nĐịa chỉ: ${address} \nEmail: ${email} \nPhương thức thanh toán: ${paymentMethod} \nGhi chú: ${note}`);
        
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
                        type="number" 
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
                    
                    {/* Trường ghi chú */}
                    <textarea 
                        placeholder="Ghi chú (nếu có)" 
                        value={note} 
                        onChange={(e) => setNote(e.target.value)} 
                        className="border rounded p-2 w-full mb-2" 
                        rows="4"
                    />

                    <h3 className="text-lg font-semibold mt-4">Phương Thức Thanh Toán</h3>
                    <div className="mt-2">
                        {/* <label>
                            <input 
                                type="radio" 
                                value="qr" 
                                checked={paymentMethod === 'qr'} 
                                onChange={() => setPaymentMethod('qr')} 
                            />
                            Quét Mã QR
                        </label> */}
                        <label className="ml-4">
                            <input 
                                type="radio" 
                                value="onlinepay" 
                                checked={paymentMethod === 'onlinepay'} 
                                onChange={() => setPaymentMethod('onlinepay')} 
                            />
                            Thanh toán bằng thông tin tài khoản bên bán
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
                                <li key={item._id} className="flex items-center justify-between py-2">
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