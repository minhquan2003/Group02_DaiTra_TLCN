import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../commons/BackButton';
import { getProductById } from '../../hooks/Products';
import { addReview } from '../../hooks/Review';

const PurchaseOrder = () => {
    const { orderId } = useParams(); // Lấy mã đơn hàng từ URL
    
    const [order, setOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addReview({
            product_id: product._id,
            user_id: order.user_id_buyer,
            rating: rating,
            comment: comment
        })
        alert("Đánh giá: " + rating + " Nhận xét: " + comment);
        setRating(0);
        setComment('');
    };

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                // Lấy thông tin đơn hàng
                const orderResponse = await axios.get(`http://localhost:5555/orders/${orderId}`);
                setOrder(orderResponse.data.data);

                

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
        });
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
                <div className="bg-white h-full w-2/3 flex rounded-lg shadow-md p-6">
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                        <img src={product.image_url} alt={product.name} className="w-3/4 h-auto rounded-md mb-4" />
                        <p><strong></strong> {product.name}</p>
                        <p><strong></strong>Số lượng:{" " + orderDetails.quantity}</p>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">Đơn hàng</h2>
                        <p><strong>Mã đơn hàng:</strong> {order._id}</p>
                        <p><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
                        <p><strong>Tổng số tiền:</strong> {order.total_amount.toLocaleString()} VNĐ</p>
                        <p><strong>Trạng thái đơn hàng:</strong> {order.status_order}</p>
                        <p><strong>Ghi chú:</strong> {order.note ? order.note : "Không có"}</p>
                        <p><strong>Ngày giao:</strong> {formatDate(order.updatedAt)}</p>
                    </div>
                </div>
                <div className="bg-white w-1/3 rounded-lg p-6">
                    <h2 className="text-xl font-semibold">Đánh giá sản phẩm</h2>
                    <form onSubmit={handleSubmit} className="py-4">
                        <div className="mb-4">
                            <label className="block mb-1">Đánh giá:</label>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="comment">Nhận xét:</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border rounded p-2 w-full"
                                rows="4"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                            Gửi đánh giá
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseOrder;