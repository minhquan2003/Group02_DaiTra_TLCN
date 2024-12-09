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
        <div className="min-h-screen p-5 bg-gray-100">
            <div className="flex items-center mb-4">
                <BackButton />
            </div>
            <div className="flex mb-4 w-full">
                <button 
                    className={`flex-1 px-4 py-2 rounded-md ${activeTab === 'sell' ? 'text-blue-500 font-bold underline bg-blue-200' : 'bg-white text-black'}`} 
                    onClick={() => setActiveTab('sell')}
                >
                    Đơn Bán
                </button>
                <button 
                    className={`flex-1 px-4 py-2 rounded-md ${activeTab === 'buy' ? 'text-blue-500 font-bold underline bg-blue-200' : 'bg-white text-black'}`} 
                    onClick={() => setActiveTab('buy')}
                >
                    Đơn Mua
                </button>
            </div>

            {activeTab === 'sell' && (
                <div>
                    <h2 className="text-xl font-bold">Danh Sách Đơn Bán</h2>
                    <div className="flex mb-4 w-full">
                        {['Pending', 'Confirmed', 'Packaged', 'Shipping', 'Success', 'Request Cancel', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                className={`flex-1 px-4 py-2 text-black rounded-md ${activeSellTab === status ? 'text-blue-500 font-bold underline bg-blue-100' : 'bg-white text-black'}`}
                                onClick={() => setActiveSellTab(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    {filteredSellOrders.length === 0 ? (
                        <p>Không có đơn bán nào cho trạng thái này.</p>
                    ) : (
                        <ul className="flex flex-wrap bg-white"> {/* Sử dụng flexbox cho danh sách */}
                            {filteredSellOrders.map(order => (
                                <Link to={`/salesOder/${order._id}`} key={order._id}>
                                    <li className="border rounded-md p-4 m-2 shadow-md transition-transform transform hover:scale-105 max-w-md"> {/* Thay đổi chiều rộng ở đây */}
                                        <div className="font-semibold text-lg mb-2">Họ tên: <span className="font-normal">{order.name}</span></div>
                                        <div className="text-gray-700">
                                            <strong>Tổng giá:</strong> <span className="font-bold">{order.total_amount.toLocaleString()} VNĐ</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <strong>Ngày tạo đơn hàng:</strong> <span className="font-normal">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <strong>Trạng thái đơn hàng:</strong> <span className="font-normal text-red-500">{order.status_order}</span>
                                        </div>
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
                        <ul className="flex flex-wrap bg-white"> {/* Sử dụng flexbox cho danh sách */}
                            {buyOrders.map(order => (
                                <Link to={`/purchaseOrder/${order._id}`} key={order._id}>
                                    <li className="border rounded-md p-4 m-2 shadow-md transition-transform transform hover:scale-105 max-w-md"> {/* Thay đổi chiều rộng ở đây */}
                                        <div className="font-semibold mb-2">
                                            <strong>Tổng giá:</strong> <span className="font-bold">{order.total_amount.toLocaleString()} VNĐ</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <strong>Ngày mua hàng:</strong> <span className="font-normal">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <strong>Trạng thái đơn hàng:</strong> <span className="font-normal">{order.status_order}</span>
                                        </div>
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