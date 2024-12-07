import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackButton from '../../commons/BackButton';

const Order = () => {
    const [activeTab, setActiveTab] = useState('sell'); // Tab mặc định là 'sell'
    const [sellOrders, setSellOrders] = useState([]);
    const [buyOrders, setBuyOrders] = useState([]);
    const [activeSellTab, setActiveSellTab] = useState('Pending'); // Tab cho đơn bán

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userInfoString = sessionStorage.getItem('userInfo');
                const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

                // Lấy đơn bán
                const sellResponse = await axios.get(`http://localhost:5555/orders/seller/${userInfo._id}`);
                setSellOrders(sellResponse.data.data);

                // Lấy đơn mua
                const buyResponse = await axios.get(`http://localhost:5555/orders/buyer/${userInfo._id}`);
                setBuyOrders(buyResponse.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Lọc đơn bán theo trạng thái
    const filteredSellOrders = sellOrders.filter(order => order.status_order === activeSellTab);

    return (
        <div className="p-5">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
            <div className="flex mb-4">
                <button 
                    className={`px-4 py-2 ${activeTab === 'sell' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setActiveTab('sell')}
                >
                    Đơn Bán
                </button>
                <button 
                    className={`px-4 py-2 ${activeTab === 'buy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setActiveTab('buy')}
                >
                    Đơn Mua
                </button>
            </div>

            {activeTab === 'sell' && (
                <div>
                    <h2 className="text-xl font-bold">Danh Sách Đơn Bán</h2>
                    <div className="flex mb-4">
                        {['Pending', 'Confirmed', 'Packaged', 'Shipping', 'Success', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                className={`px-4 py-2 ${activeSellTab === status ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setActiveSellTab(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    {filteredSellOrders.length === 0 ? (
                        <p>Không có đơn bán nào cho trạng thái này.</p>
                    ) : (
                        <ul>
                            {filteredSellOrders.map(order => (
                                <Link to={`/salesOder/${order._id}`} key={order._id}>
                                    <li className="border p-2 mb-2">
                                        <strong>ID người mua:</strong> {order.user_id_buyer} - 
                                        <strong>Họ tên:</strong> {order.name} - 
                                        <strong>Tổng giá:</strong> {order.total_amount.toLocaleString()} VNĐ - 
                                        <strong>Trạng thái đơn hàng:</strong> {order.status_order}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {activeTab === 'buy' && (
                <div>
                    <h2 className="text-xl font-bold">Danh Sách Đơn Mua</h2>
                    {buyOrders.length === 0 ? (
                        <p>Không có đơn mua nào.</p>
                    ) : (
                        <ul>
                            {buyOrders.map(order => (
                                <Link to={`/purchaseOrder/${order._id}`} key={order._id}>
                                    <li className="border p-2 mb-2">
                                        <strong>ID người bán:</strong> {order.user_id_seller} - 
                                        <strong>Tổng giá:</strong> {order.total_amount.toLocaleString()} VNĐ - 
                                        <strong>Trạng thái đơn hàng:</strong> {order.status_order}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Order;