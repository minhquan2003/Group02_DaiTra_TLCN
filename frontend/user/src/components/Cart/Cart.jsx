import React, { useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Sản phẩm A',
            quantity: 2,
            price: 1000000, // Đơn giá
            imageUrl: 'https://via.placeholder.com/100',
            selected: false,
        },
        {
            id: 2,
            name: 'Sản phẩm B',
            quantity: 1,
            price: 1500000,
            imageUrl: 'https://via.placeholder.com/100',
            selected: false,
        },
        {
            id: 3,
            name: 'Sản phẩm C',
            quantity: 3,
            price: 500000,
            imageUrl: 'https://via.placeholder.com/100',
            selected: false,
        },
    ]);

    const handleCheckboxChange = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };

    const totalAmount = cartItems.reduce((acc, item) => 
        item.selected ? acc + item.quantity * item.price : acc, 
    0);

    return (
        <div className="p-5 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Giỏ Hàng</h2>
            <ul className="divide-y divide-gray-300">
                {cartItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={item.selected} 
                                onChange={() => handleCheckboxChange(item.id)} 
                                className="mr-4"
                            />
                            <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded mr-4" 
                            />
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-500">Đơn giá: {item.price.toLocaleString()} VNĐ</p>
                                <p className="text-gray-500">Số lượng: {item.quantity}</p>
                            </div>
                        </div>
                        <span className="font-bold">{(item.price * item.quantity).toLocaleString() + ' VNĐ'}</span>
                    </li>
                ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between font-bold">
                <span>Tổng Giá:</span>
                <span>{totalAmount.toLocaleString()} VNĐ</span>
            </div>
            <button className="mt-5 bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                Tiến Hành Thanh Toán
            </button>
        </div>
    );
};

export default Cart;