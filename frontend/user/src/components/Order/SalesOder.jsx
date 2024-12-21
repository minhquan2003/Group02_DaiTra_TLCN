import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { json, useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../commons/BackButton';
import { getProductById } from '../../hooks/Products';
import { updateStatusOrder } from '../../hooks/Orders';
import { createNotification } from '../../hooks/Notifications';

const SalesOder = () => {
    const { orderId } = useParams(); // Lấy mã đơn hàng từ URL
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    
    const [order, setOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [product, setProduct] = useState(null);
    const [payment, setPayment] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelText, setCancelText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Lấy thông tin đơn hàng
                const orderResponse = await axios.get(`http://localhost:5555/orders/${orderId}`);
                setOrder(orderResponse.data.data);

                const paymentRe = await axios.get(`http://localhost:5555/payments/order/${orderId}`);
                setPayment(paymentRe.data.data);

                // Lấy thông tin chi tiết đơn hàng
                const detailsResponse = await axios.get(`http://localhost:5555/orderDetails/order/${orderId}`);
                const detailsData = detailsResponse.data.data;

                // Nếu có dữ liệu, lấy sản phẩm đầu tiên
                if (detailsData.length > 0) {
                    
                    setOrderDetails(detailsData[0]); // Lưu đối tượng đầu tiên
                    const idPro = detailsData[0].product_id
                    const product1 = await getProductById(idPro)
                    setProduct(product1)
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
                setError('Không thể tải thông tin đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        let status_order = "Cancelled";
        alert(`Đơn hàng đã được chuyển sang ${status_order}.`)
        const aa = updateStatusOrder(orderId, status_order)
        if(order.user_id_buyer){
            const aa = await createNotification({
                user_id_created: userInfo._id,
                user_id_receive: order.user_id_buyer,
                message: `Đơn hàng ${product.name} của bạn đã bị huỷ do: ${cancelText}.`
            })
        }
        navigate(`/order/${orderId}`)
    };

    const handleChangeStatus = async (e) => {
        e.preventDefault();
        let status_order = "";
        if(order.status_order == 'Pending'){
            if(order.user_id_buyer){
                const aa = await createNotification({
                    user_id_created: userInfo._id,
                    user_id_receive: order.user_id_buyer,
                    message: `Đơn hàng ${product.name} của bạn đã được xác nhận thành công.`
                })
            }
            status_order = 'Confirmed';
        }else if(order.status_order == 'Confirmed'){
            status_order = 'Packaged';
        }else if(order.status_order == 'Packaged'){
            status_order = 'Shipping';
        }
        else if(order.status_order == 'Request Cancel'){
            status_order = 'Cancelled';
        }else if(order.status_order == 'Shipping'){
            if(order.user_id_buyer){
                const aa = await createNotification({
                    user_id_created: userInfo._id,
                    user_id_receive: order.user_id_buyer,
                    message: `Đơn hàng ${product.name} của bạn đã được giao thành công.`
                })
            }
            status_order = 'Success';
        }
        alert(`Đơn hàng đã được chuyển sang ${status_order}.`)
        const aa = updateStatusOrder(orderId, status_order)
        navigate(`/order/${orderId}`)
    };

    if (loading) {
        return <p>Đang tải thông tin đơn hàng...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Không tìm thấy thông tin đơn hàng.</p>;
    }

    return (
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
                {/* <h1 className="text-2xl font-bold ml-4">Thanh Toán</h1> */}
            </div>
            <h1 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h1>
            <div className="flex bg-white rounded-lg shadow-md">
                <div className="bg-white h-full w-1/2 flex rounded-lg shadow-md p-6">
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                        <img src={product.image_url} alt={product.name} className="w-3/4 h-auto rounded-md mb-4" />
                        <p><strong></strong> {product.name}</p>
                        <p><strong></strong>Số lượng:{" " + orderDetails.quantity}</p>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">Đơn hàng</h2>
                        <p><strong>Mã đơn hàng:</strong> {order._id}</p>
                        <p><strong>Người mua:</strong> {order.name}</p>
                        <p><strong>Số điện thoại:</strong> {order.phone}</p>
                        <p><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
                        <p><strong>Tổng số tiền:</strong> {order.total_amount.toLocaleString()} VNĐ</p>
                        <p><strong>Trạng thái đơn hàng:</strong> {order.status_order}</p>
                        <p><strong>Ghi chú:</strong> {order.note ? order.note : "Không có"}</p>
                        <p><strong>Ngày tạo đơn:</strong> {formatDate(order.createdAt)}</p>
                        <p><strong>Trạng thái thanh toán:</strong> {payment[0].status_payment}</p>
                        <p><strong>Ngày thanh toán:</strong> {formatDate(payment[0].createdAt)}</p>
                    </div>
                </div>
                <div className="bg-white w-1/2 rounded-lg p-6">
                    <h2 className="text-xl font-semibold">Cập nhật đơn hàng</h2>
                    {order.status_order === 'Pending' ? (
                        <div className="bg-white rounded-lg mt-6">
                            <div>
                                <button 
                                    onClick={handleChangeStatus} 
                                    className="bg-gray-100 text-green-600 font-bold py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                                >
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                            <div className="mb-4 w-1/2 mt-10">
                                <textarea 
                                    type="text" 
                                    placeholder="Nguyên nhân huỷ đơn hàng" 
                                    value={cancelText} 
                                    onChange={(e) => setCancelText(e.target.value)} 
                                    className="border border-gray-300 p-2 w-full rounded"
                                    required
                                />
                            </div>                      
                            <div>
                                <button 
                                    onClick={handleCancel} 
                                    className="bg-gray-100 text-red-600 font-bold py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition duration-200"
                                >
                                    Huỷ đơn hàng
                                </button>
                            </div>
                        </div>
                        
                    ) : order.status_order === 'Confirmed' ? (
                        
                        <div className="bg-white rounded-lg shadow-md">
                            <div>
                                <button 
                                    onClick={handleChangeStatus} 
                                    className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200"
                                >
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                            <div className="mb-4 w-1/2 mt-10">
                                <textarea 
                                    type="text" 
                                    placeholder="Nguyên nhân huỷ đơn hàng" 
                                    value={cancelText} 
                                    onChange={(e) => setCancelText(e.target.value)} 
                                    className="border border-gray-300 p-2 w-full rounded"
                                    required
                                />
                            </div>                      
                            <div>
                                <button 
                                    onClick={handleCancel} 
                                    className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200"
                                >
                                    Huỷ đơn hàng
                                </button>
                            </div>
                        </div>
                        
                    ) : order.status_order === 'Packaged' ? (
                        <div className="bg-white rounded-lg shadow-md">
                            <div>
                                <button 
                                    onClick={handleChangeStatus} 
                                    className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200"
                                >
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                            <div className="mb-4 w-1/2 mt-10">
                                <textarea 
                                    type="text" 
                                    placeholder="Nguyên nhân huỷ đơn hàng" 
                                    value={cancelText} 
                                    onChange={(e) => setCancelText(e.target.value)} 
                                    className="border border-gray-300 p-2 w-full rounded"
                                    required
                                />
                            </div>                      
                            <div>
                                <button 
                                    onClick={handleCancel} 
                                    className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200"
                                >
                                    Huỷ đơn hàng
                                </button>
                            </div>
                        </div>
                    ) : order.status_order === 'Shipping' ? (
                        <div className="bg-white rounded-lg shadow-md">
                            <div>
                                <button 
                                    onClick={handleChangeStatus} 
                                    className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200"
                                >
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                            <div className="mb-4 w-1/2 mt-10">
                                <textarea 
                                    type="text" 
                                    placeholder="Nguyên nhân huỷ đơn hàng" 
                                    value={cancelText} 
                                    onChange={(e) => setCancelText(e.target.value)} 
                                    className="border border-gray-300 p-2 w-full rounded"
                                    required
                                />
                            </div>                      
                            <div>
                                <button 
                                    onClick={handleCancel} 
                                    className="bg-red-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200"
                                >
                                    Huỷ đơn hàng
                                </button>
                            </div>
                        </div>
                    ) : order.status_order === 'Success' ? (
                        null
                    ) : order.status_order === 'Request Cancel' ? (
                        <button onClick={handleChangeStatus} className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-200">
                            Xác nhận huỷ
                        </button>
                    ) : order.status_order === 'Cancelled' ?(
                        null
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SalesOder;