import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserById } from '../../hooks/Users';
import { createNotification } from '../../hooks/Notifications';
import { createPayment } from '../../hooks/Payment'; 

const PaymentInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const cartItems = location.state?.cartItems || [];
    const sellerInfo = cartItems.map(item => item.user_seller ? useUserById(item.user_seller) : null);

    const storedUserInfo = JSON.parse(sessionStorage.getItem("orderIds")) || [];

    const handlePayConfirm = async (orderId, buyer, seller, total_amount) => {
        if (!orderId) {
            console.error("Order ID không hợp lệ");
            return;
        }

        await createNotification({
            user_id_created: buyer,
            user_id_receive: seller,
            message: `Có đơn hàng đã thanh toán số tiền ${total_amount} cho bạn.`
        });
        let user_buy = '';
        if(sellerInfo){ 
            user_buy = buyer
        }else{user_buy = ''}

        await createPayment({
            type: "Pay Online",
            order_id: orderId,
            user_id_pay: user_buy,
            user_id_receive: seller,
            total_price: total_amount,
            status_payment: 'Đã thanh toán'
        });
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Thông Tin Thanh Toán</h1>
            {cartItems.map((item, index) => {
                const seller = sellerInfo[index]; // Lấy seller tương ứng với sản phẩm
                return (
                    <div key={item._id} className="border rounded shadow-md p-5 w-full max-w-2xl mb-4 flex">
                        {seller && (
                            <>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-2">Tên Chủ Tài Khoản:</h2>
                                    <p className="text-lg">{seller.name}</p>

                                    <h2 className="text-xl font-semibold mb-2">Số điện thoại:</h2>
                                    <p className="text-lg">{seller.phone}</p>

                                    <h2 className="text-xl font-semibold mb-2">Sản phẩm:</h2>
                                    <p className="text-lg">{item.product_name + ". Số lượng: " }x{item.product_quantity} </p>

                                    <h2 className="text-xl font-semibold mb-2 mt-4">Số Tiền Cần Thanh Toán:</h2>
                                    <p className="text-lg text-green-600 font-bold"> {(item.product_quantity * item.product_price).toLocaleString()} VNĐ</p>

                                    <button 
                                        onClick={() => handlePayConfirm(storedUserInfo[index], item.user_buyer, item.user_seller, (item.product_quantity * item.product_price))} 
                                        className={`mt-6 text-red-600 font-bold py-2 px-4 rounded-lg shadow transition duration-200 bg-gray-100 hover:bg-gray-300`}
                                    >
                                        Xác nhận đã thanh toán
                                    </button>
                                </div>
                                <div className="ml-4 flex-none">
                                    <h2 className="text-xl font-semibold mb-2">Mã QR:</h2>
                                    <img 
                                        src={seller.qrPayment} 
                                        alt="Mã QR" 
                                        className="w-60 h-auto border rounded" 
                                    />
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
            <div className="flex space-x-4">
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-gray-100 text-xl text-red-600 font-bold py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                >
                    Về trang chủ
                </button>
            </div>
        </div>
    );
};

export default PaymentInfo;