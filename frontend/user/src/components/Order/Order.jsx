import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackButton from '../../commons/BackButton';

const Order = () => {
    const [activeTab, setActiveTab] = useState('sell');
    const [sellOrders, setSellOrders] = useState([]);
    const [buyOrders, setBuyOrders] = useState([]);
    const [activeSellTab, setActiveSellTab] = useState('Pending');
    const [activeBuyStatus, setActiveBuyStatus] = useState('All'); // Trạng thái mặc định cho đơn mua
    const [sortOrder, setSortOrder] = useState('none');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userInfoString = sessionStorage.getItem('userInfo');
                const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

                const sellResponse = await axios.get(`http://localhost:5555/orders/seller/${userInfo._id}`);
                setSellOrders(sellResponse.data.data);

                const buyResponse = await axios.get(`http://localhost:5555/orders/buyer/${userInfo._id}`);
                setBuyOrders(buyResponse.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const filteredSellOrders = sellOrders.filter(order => {
        const matchesStatus = order.status_order === activeSellTab;
        const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const filteredBuyOrders = buyOrders.filter(order => {
        const matchesSearch = activeBuyStatus === 'All' || order.status_order === activeBuyStatus;
        const matchesSearchTerm = order.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch && matchesSearchTerm;
    });

    const sortOrders = (orders) => {
        if (sortOrder === 'newest') {
            return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortOrder === 'oldest') {
            return orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        return orders; // Không sắp xếp
    };

    const filterByDateRange = (orders) => {
        return orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return (!startDate || orderDate >= start) && (!endDate || orderDate <= end);
        });
    };

    const filteredAndSortedSellOrders = sortOrders(filterByDateRange(filteredSellOrders));
    const filteredAndSortedBuyOrders = sortOrders(filteredBuyOrders);

    const handleResetFilters = () => {
        setStartDate('');
        setEndDate('');
        setSortOrder('none');
        setSearchTerm('');
        setActiveBuyStatus('All'); // Reset trạng thái đơn mua
    };

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
                    <div className="flex mb-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded mr-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Tìm theo tên người mua"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 p-2 rounded mr-2"
                        />
                        <select 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                        >
                            <option value="none">Không sắp xếp</option>
                            <option value="newest">Mới nhất</option>
                            <option value="oldest">Cũ nhất</option>
                        </select>
                        <button 
                            onClick={handleResetFilters}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded ml-2"
                        >
                            Hủy Lọc
                        </button>
                    </div>
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
                    {filteredAndSortedSellOrders.length === 0 ? (
                        <p>Không có đơn bán nào cho trạng thái này.</p>
                    ) : (
                        <ul className="flex flex-wrap bg-white">
                            {filteredAndSortedSellOrders.map(order => (
                                <Link to={`/salesOder/${order._id}`} key={order._id}>
                                    <li className="border rounded-md p-4 m-2 shadow-md transition-transform transform hover:scale-105 max-w-md">
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
                    <div className="flex mb-4">
                        <select 
                            value={activeBuyStatus}
                            onChange={(e) => setActiveBuyStatus(e.target.value)}
                            className="border border-gray-300 p-2 rounded mr-2"
                        >
                            <option value="All">Tất cả trạng thái</option>
                            <option value="Pending">Chờ xử lý</option>
                            <option value="Confirmed">Đã xác nhận</option>
                            <option value="Packaged">Đang đóng gói</option>
                            <option value="Shipping">Đang vận chuyển</option>
                            <option value="Success">Thành công</option>
                            <option value="Request Cancel">Yêu cầu hủy</option>
                            <option value="Cancelled">Đã hủy</option>
                        </select>
                        <button 
                            onClick={handleResetFilters}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Hủy Lọc
                        </button>
                    </div>
                    {filteredAndSortedBuyOrders.length === 0 ? (
                        <p>Không có đơn mua nào.</p>
                    ) : (
                        <ul className="flex flex-wrap bg-white">
                            {filteredAndSortedBuyOrders.map(order => (
                                <Link to={`/purchaseOrder/${order._id}`} key={order._id}>
                                    <li className="border rounded-md p-4 m-2 shadow-md transition-transform transform hover:scale-105 max-w-md">
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