import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBell } from 'react-icons/fi';
import NotificationPopup from './NotificationPopup.jsx'; // Đường dẫn đến NotificationPopup

const NotificationIcon = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            if (userId) {
                fetchNotifications(userId);
            } else {
                // Nếu userId là null, cập nhật notifications thành mảng rỗng
                setNotifications([]);
            }
        }
    }, [isOpen, userId]);

    const fetchNotifications = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5555/notifications/user/${userId}`);
            const data = response.data;
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setNotifications([]); // Nếu có lỗi, có thể đặt notifications thành mảng rỗng
        }
    };

    return (
        <div className="relative">
            <span className="cursor-pointer" onClick={togglePopup}>
                <FiBell className="h-5 w-5" /> {/* Notification icon */}
            </span>

            {isOpen && (
                <NotificationPopup 
                    notifications={notifications} 
                    onClose={togglePopup} 
                />
            )}
        </div>
    );
};

export default NotificationIcon;